// Receives form submissions and creates items in Monday.com boards.
// Requires env var: MONDAY_TOKEN (from Monday.com → Profile → Developers → API Tokens).

const MONDAY_API = 'https://api.monday.com/v2';

async function mondayPost(query) {
  const res = await fetch(MONDAY_API, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${process.env.MONDAY_TOKEN}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ query }),
  });
  const text = await res.text();
  if (!res.ok) throw new Error(`Monday.com ${res.status}: ${text}`);
  const json = JSON.parse(text);
  if (json.errors) throw new Error(`Monday.com error: ${JSON.stringify(json.errors)}`);
  return json.data;
}

async function createItem(boardId, name, columnValues) {
  const cols = Object.fromEntries(Object.entries(columnValues).filter(([, v]) => v != null && v !== ''));
  const mutation = `mutation {
    create_item(
      board_id: ${boardId},
      item_name: ${JSON.stringify(name)},
      column_values: ${JSON.stringify(JSON.stringify(cols))}
    ) { id }
  }`;
  return mondayPost(mutation);
}

const today = () => new Date().toISOString().split('T')[0];

// Add a board config here for each form type as Monday boards are created.
const BOARDS = {
  visit: {
    boardId: 18416392819,
    columns: ({ email, phone, context }) => ({
      email_mm4058vs:     { email, text: email },
      phone_mm40rv3a:     phone ? { phone, countryShortName: 'US' } : null,
      text_mm40znzm:      context.visiting   || '',
      text_mm408yc:       context.party       || '',
      text_mm4099ee:      context.neighborhood || '',
      long_text_mm40zh3p: context.note ? { text: context.note } : null,
      date_mm40nqpg:      { date: today() },
    }),
  },
  // connect, host, house-church, waitlist, partner — added as Monday boards are created
};

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') return { statusCode: 204, body: '' };
  if (event.httpMethod !== 'POST') return { statusCode: 405, body: 'Method not allowed' };

  let payload;
  try {
    payload = JSON.parse(event.body);
  } catch {
    return { statusCode: 400, body: 'Invalid JSON' };
  }

  const { name = '', email = '', phone = '', formType = 'connect', context = {} } = payload;

  if (!name || !email) {
    return { statusCode: 400, body: 'Name and email are required' };
  }

  try {
    const board = BOARDS[formType];
    if (board) {
      await createItem(board.boardId, name, board.columns({ email, phone, context }));
    } else {
      console.log('No board configured for formType:', formType, JSON.stringify({ name, email, phone, context }));
    }

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    console.error('Monday.com submission error:', err.message);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
