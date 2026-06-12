#!/usr/bin/env node
// Sends one test item to each Monday.com board to verify wiring.
// Run: MONDAY_TOKEN=<your_token> node scripts/test-monday-boards.js

const MONDAY_API = 'https://api.monday.com/v2';
const TOKEN = process.env.MONDAY_TOKEN;

if (!TOKEN) {
  console.error('Missing MONDAY_TOKEN. Run: MONDAY_TOKEN=<token> node scripts/test-monday-boards.js');
  process.exit(1);
}

async function createItem(boardId, name, columnValues) {
  const cols = Object.fromEntries(Object.entries(columnValues).filter(([, v]) => v != null && v !== ''));
  const query = `mutation {
    create_item(
      board_id: ${boardId},
      item_name: ${JSON.stringify(name)},
      column_values: ${JSON.stringify(JSON.stringify(cols))}
    ) { id }
  }`;
  const res = await fetch(MONDAY_API, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json', 'API-Version': '2024-01' },
    body: JSON.stringify({ query }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data.create_item.id;
}

const today = () => new Date().toISOString().split('T')[0];

const TESTS = [
  {
    label: 'Connect Form',
    boardId: 18417581433,
    name: 'Test – Connect',
    cols: {
      email_mm48962z:     { email: 'test@blacksburgchurch.com', text: 'test@blacksburgchurch.com' },
      phone_mm485z6r:     { phone: '5405550001', countryShortName: 'US' },
      long_text_mm48b0sv: { text: 'I follow Jesus — looking for community.' },
      text_mm48nee0:      'House church, Bible study',
      text_mm48bghz:      'Blacksburg',
      long_text_mm48zwqm: { text: 'This is a test submission — please delete.' },
      date_mm48903v:      { date: today() },
    },
  },
  {
    label: 'Host a House Church',
    boardId: 18417581463,
    name: 'Test – Host',
    cols: {
      email_mm48ca14:     { email: 'test@blacksburgchurch.com', text: 'test@blacksburgchurch.com' },
      phone_mm48bmzk:     { phone: '5405550002', countryShortName: 'US' },
      text_mm48fwxm:      "I'm ready to host.",
      long_text_mm48w2qt: { text: 'We love having people in our home.' },
      text_mm48s8d7:      'Prices Fork, Blacksburg',
      long_text_mm48n8mm: { text: 'This is a test submission — please delete.' },
      date_mm4881az:      { date: today() },
    },
  },
  {
    label: 'House Church Sign-Up',
    boardId: 18417581486,
    name: 'Test – HC Sign-Up',
    cols: {
      email_mm48egph:  { email: 'test@blacksburgchurch.com', text: 'test@blacksburgchurch.com' },
      phone_mm48cdpw:  { phone: '5405550003', countryShortName: 'US' },
      text_mm48xfb4:   "N° 01 · Plum Creek",
      date_mm48v7mq:   { date: today() },
    },
  },
  {
    label: 'House Church Waitlist',
    boardId: 18417581508,
    name: 'Test – HC Waitlist',
    cols: {
      email_mm48ctn0:  { email: 'test@blacksburgchurch.com', text: 'test@blacksburgchurch.com' },
      text_mm487dh6:   'Downtown',
      text_mm48wmy1:   'Blacksburg',
      date_mm48a2p9:   { date: today() },
    },
  },
  {
    label: 'Ministry Partners Interest',
    boardId: 18417581522,
    name: 'Test – Partners',
    cols: {
      email_mm48zecb:  { email: 'test@blacksburgchurch.com', text: 'test@blacksburgchurch.com' },
      phone_mm48rjrm:  { phone: '5405550005', countryShortName: 'US' },
      text_mm48e7m5:   'Blue Ridge Christian Camp',
      date_mm48fdqg:   { date: today() },
    },
  },
];

async function main() {
  console.log('Sending test items to Monday.com boards...\n');
  let passed = 0;
  for (const t of TESTS) {
    process.stdout.write(`  ${t.label}... `);
    try {
      const id = await createItem(t.boardId, t.name, t.cols);
      console.log(`✓ item ID ${id}`);
      passed++;
    } catch (err) {
      console.log(`✗ FAILED: ${err.message}`);
    }
  }
  console.log(`\n${passed}/${TESTS.length} boards verified.`);
  if (passed === TESTS.length) {
    console.log('All good — check each board in Monday.com and delete the test items.');
  }
}

main().catch(err => { console.error(err); process.exit(1); });
