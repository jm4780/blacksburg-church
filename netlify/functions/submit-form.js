// Receives form submissions and creates people in Planning Center Online.
// Requires env vars: PCO_APP_ID and PCO_SECRET (from your PCO Personal Access Token).

const PCO_BASE = 'https://api.planningcenteronline.com/people/v2';

function pcoAuth() {
  const creds = Buffer.from(`${process.env.PCO_APP_ID}:${process.env.PCO_SECRET}`).toString('base64');
  return `Basic ${creds}`;
}

async function pcoPost(path, body) {
  const res = await fetch(`${PCO_BASE}${path}`, {
    method: 'POST',
    headers: { 'Authorization': pcoAuth(), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`PCO error ${res.status}: ${text}`);
  }
  return res.json();
}

async function createPerson(firstName, lastName) {
  const res = await pcoPost('/people', {
    data: { type: 'Person', attributes: { first_name: firstName, last_name: lastName } },
  });
  return res.data.id;
}

async function addEmail(personId, email) {
  await pcoPost(`/people/${personId}/emails`, {
    data: { type: 'Email', attributes: { address: email, location: 'Home', primary: true } },
  });
}

async function addPhone(personId, phone) {
  if (!phone) return;
  await pcoPost(`/people/${personId}/phone_numbers`, {
    data: { type: 'PhoneNumber', attributes: { number: phone, location: 'Mobile' } },
  });
}

async function addNote(personId, noteText) {
  if (!noteText) return;
  await pcoPost(`/people/${personId}/notes`, {
    data: { type: 'Note', attributes: { note: noteText } },
  });
}

exports.handler = async (event) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, body: '' };
  }
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

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
    const parts     = name.trim().split(/\s+/);
    const firstName = parts[0];
    const lastName  = parts.slice(1).join(' ') || '';

    const personId = await createPerson(firstName, lastName);
    await addEmail(personId, email);
    await addPhone(personId, phone);

    // Build a note with any extra context so nothing is lost
    const noteLines = [`Form: ${formType}`];
    Object.entries(context).forEach(([k, v]) => {
      if (v) noteLines.push(`${k}: ${Array.isArray(v) ? v.join(', ') : v}`);
    });
    await addNote(personId, noteLines.join('\n'));

    return {
      statusCode: 200,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ok: true }),
    };
  } catch (err) {
    console.error('PCO submission error:', err.message);
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
