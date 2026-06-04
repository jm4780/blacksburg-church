// Receives form submissions, creates people in Planning Center Online,
// and submits to the matching PCO form so submissions appear in reports.
// Requires env vars: PCO_APP_ID and PCO_SECRET (from your PCO Personal Access Token).

const PCO_BASE = 'https://api.planningcenteronline.com/people/v2';

function pcoAuth() {
  const creds = Buffer.from(`${process.env.PCO_APP_ID}:${process.env.PCO_SECRET}`).toString('base64');
  return `Basic ${creds}`;
}

async function pcoPost(path, body) {
  const url = `${PCO_BASE}${path}`;
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Authorization': pcoAuth(), 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  });
  const text = await res.text();
  if (!res.ok) {
    console.error(`PCO POST ${url} → ${res.status}: ${text}`);
    throw new Error(`PCO error ${res.status}: ${text}`);
  }
  return JSON.parse(text);
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

// Submit to a PCO form so the submission appears in Planning Center reports.
// Submit to a PCO form with field values inline.
// Per the PCO OpenAPI spec, each FormSubmissionValue needs form_field_id in
// attributes AND form_field in relationships — both referencing the same field.
async function submitPCOForm(formId, personId) {
  // NOTE: PCO's API 500s on any request with included FormSubmissionValues,
  // despite their documentation saying it's supported. Submitting person_id
  // only until PCO fixes the bug — the submission still appears in reports.
  await pcoPost(`/forms/${formId}/form_submissions`, {
    data: {
      type: 'FormSubmission',
      attributes: { person_id: personId },
    },
  });
}

// Add PCO form IDs and field mappings here as each form is set up in Planning Center.
// Keys in fieldMap must match the context keys sent from the frontend.
const PCO_FORMS = {
  visit: {
    formId: '1130758',
    fieldMap: {
      // phone omitted — added to person profile via People API instead
      visiting:     '9879601',
      party:        '9879613',
      neighborhood: '9879631',
      note:         '9879642',
    },
  },
  // connect, host, 'house-church', waitlist, partner — added as PCO forms are created
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
    const parts     = name.trim().split(/\s+/);
    const firstName = parts[0];
    const lastName  = parts.slice(1).join(' ') || '';

    const personId = await createPerson(firstName, lastName);
    await addEmail(personId, email);
    await addPhone(personId, phone);

    const formConfig = PCO_FORMS[formType];
    if (formConfig) {
      await submitPCOForm(formConfig.formId, personId);
    } else {
      // Fallback for unconfigured forms: store context as a note
      const noteLines = [`Form: ${formType}`];
      Object.entries(context).forEach(([k, v]) => {
        if (v) noteLines.push(`${k}: ${Array.isArray(v) ? v.join(', ') : v}`);
      });
      await addNote(personId, noteLines.join('\n'));
    }

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
