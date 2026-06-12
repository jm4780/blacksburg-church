#!/usr/bin/env node
// One-time script — creates all Monday.com boards for Blacksburg Church forms.
// Run: MONDAY_TOKEN=<your_token> node scripts/setup-monday-boards.js
//
// Get your token: Monday.com → profile picture → Developers → API v2 Token

const MONDAY_API = 'https://api.monday.com/v2';
const TOKEN = process.env.MONDAY_TOKEN;

if (!TOKEN) {
  console.error('Missing MONDAY_TOKEN. Run: MONDAY_TOKEN=<token> node scripts/setup-monday-boards.js');
  process.exit(1);
}

async function api(query) {
  const res = await fetch(MONDAY_API, {
    method: 'POST',
    headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json', 'API-Version': '2024-01' },
    body: JSON.stringify({ query }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
}

async function createBoard(name) {
  const d = await api(`mutation { create_board(board_name: ${JSON.stringify(name)}, board_kind: public) { id } }`);
  return d.create_board.id;
}

async function createColumn(boardId, title, type) {
  const d = await api(`mutation {
    create_column(board_id: ${boardId}, title: ${JSON.stringify(title)}, column_type: ${type}) { id }
  }`);
  return d.create_column.id;
}

async function getColumns(boardId) {
  const d = await api(`{ boards(ids: [${boardId}]) { columns { id title type } } }`);
  return d.boards[0].columns;
}

// Board definitions: name + columns to create
const BOARD_DEFS = [
  {
    key: 'connect',
    name: 'Connect Form',
    columns: [
      { title: 'Email',        type: 'email' },
      { title: 'Phone',        type: 'phone' },
      { title: 'Faith Journey', type: 'text' },
      { title: 'Interests',    type: 'long_text' },
      { title: 'Neighborhood', type: 'text' },
      { title: 'Note',         type: 'long_text' },
      { title: 'Date',         type: 'date' },
    ],
  },
  {
    key: 'host',
    name: 'Host a House Church',
    columns: [
      { title: 'Email',     type: 'email' },
      { title: 'Phone',     type: 'phone' },
      { title: 'Readiness', type: 'text' },
      { title: 'Why Hosting', type: 'long_text' },
      { title: 'Address',   type: 'text' },
      { title: 'Note',      type: 'long_text' },
      { title: 'Date',      type: 'date' },
    ],
  },
  {
    key: 'house-church',
    name: 'House Church Sign-Up',
    columns: [
      { title: 'Email',       type: 'email' },
      { title: 'Phone',       type: 'phone' },
      { title: 'House Church', type: 'text' },
      { title: 'Date',        type: 'date' },
    ],
  },
  {
    key: 'waitlist',
    name: 'House Church Waitlist',
    columns: [
      { title: 'Email',       type: 'email' },
      { title: 'House Church', type: 'text' },
      { title: 'Town',        type: 'text' },
      { title: 'Date',        type: 'date' },
    ],
  },
  {
    key: 'partner',
    name: 'Ministry Partners Interest',
    columns: [
      { title: 'Email',   type: 'email' },
      { title: 'Phone',   type: 'phone' },
      { title: 'Partner', type: 'text' },
      { title: 'Date',    type: 'date' },
    ],
  },
];

async function main() {
  console.log('Creating Monday.com boards...\n');
  const results = {};

  for (const def of BOARD_DEFS) {
    process.stdout.write(`Creating "${def.name}"... `);
    const boardId = await createBoard(def.name);
    console.log(`board ID: ${boardId}`);

    for (const col of def.columns) {
      process.stdout.write(`  + column "${col.title}"... `);
      await createColumn(boardId, col.title, col.type);
      console.log('done');
    }

    // Fetch all columns (includes the auto-created "Name" column)
    const cols = await getColumns(boardId);
    results[def.key] = { boardId, columns: cols };
    console.log(`  Columns: ${cols.map(c => `${c.title} (${c.id})`).join(', ')}\n`);
  }

  console.log('\n========== COPY THIS OUTPUT ==========');
  console.log(JSON.stringify(results, null, 2));
  console.log('======================================');
  console.log('\nPaste this output back to Claude to wire up submit-form.js.');
}

main().catch(err => { console.error(err); process.exit(1); });
