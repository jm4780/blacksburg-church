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
      text_mm40znzm:      context.visiting    || '',
      text_mm408yc:       context.party        || '',
      text_mm4099ee:      context.neighborhood || '',
      long_text_mm40zh3p: context.note ? { text: context.note } : null,
      date_mm40nqpg:      { date: today() },
    }),
  },
  connect: {
    boardId: 18417581433,
    columns: ({ email, phone, context }) => ({
      email_mm48962z:     { email, text: email },
      phone_mm485z6r:     phone ? { phone, countryShortName: 'US' } : null,
      long_text_mm48b0sv: context.situation    ? { text: context.situation }                           : null,
      text_mm48nee0:      Array.isArray(context.preferences) ? context.preferences.join(', ') : (context.preferences || ''),
      text_mm48bghz:      context.neighborhood || '',
      long_text_mm48zwqm: context.note         ? { text: context.note }                               : null,
      date_mm48903v:      { date: today() },
    }),
  },
  host: {
    boardId: 18417581463,
    columns: ({ email, phone, context }) => ({
      email_mm48ca14:     { email, text: email },
      phone_mm48bmzk:     phone ? { phone, countryShortName: 'US' } : null,
      text_mm48fwxm:      context.readiness    || '',
      long_text_mm48w2qt: context.reason       ? { text: context.reason }  : null,
      text_mm48s8d7:      context.address      || '',
      long_text_mm48n8mm: context.note         ? { text: context.note }    : null,
      date_mm4881az:      { date: today() },
    }),
  },
  'house-church': {
    boardId: 18417581486,
    columns: ({ email, phone, context }) => ({
      email_mm48egph:  { email, text: email },
      phone_mm48cdpw:  phone ? { phone, countryShortName: 'US' } : null,
      text_mm48xfb4:   context.houseChurch || '',
      date_mm48v7mq:   { date: today() },
    }),
  },
  waitlist: {
    boardId: 18417581508,
    columns: ({ email, phone, context }) => ({
      email_mm48ctn0:  { email, text: email },
      phone_mm4822dp:  phone ? { phone, countryShortName: 'US' } : null,
      text_mm487dh6:   context.houseChurch || '',
      text_mm48wmy1:   context.town        || '',
      date_mm48a2p9:   { date: today() },
    }),
  },
  partner: {
    boardId: 18417581522,
    columns: ({ email, phone, context }) => ({
      email_mm48zecb:  { email, text: email },
      phone_mm48rjrm:  phone ? { phone, countryShortName: 'US' } : null,
      text_mm48e7m5:   context.partner || '',
      date_mm48fdqg:   { date: today() },
    }),
  },
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
