/**
 * Based on examples:
 * - https://ccstockholm.netlify.com/.netlify/functions/googleSheets
 * - https://github.com/tobilg/netlify-functions-landingpage
 */

import { google } from 'googleapis';
import { format } from 'date-fns';

require('dotenv').config({
  path: `.env.${process.env.NODE_ENV}`
});

const GOOGLE_SPREADSHEET_ID = process.env.GOOGLE_SPREADSHEETS_ID;
const GOOGLE_CREDS = JSON.parse(process.env.GOOGLE_API_CREDENTIALS);
const GOOGLE_SPREADSHEET_WORKSHEET_ID = 'Sheet1!A1';
const FULL_DATE_TOKEN = 'yyyy-MM-dd HH:mm:ss'; // 2019-11-24 19:04:10

const getClient = ({ scopes }) => {
  return google.auth.getClient({
    credentials: GOOGLE_CREDS,
    scopes: scopes
  });
};

const authorizeSheets = async () => {
  const client = await getClient({
    scopes: ['https://www.googleapis.com/auth/spreadsheets']
  });
  return google.sheets({
    version: 'v4',
    auth: client
  });
};

const prepareResource = values => {
  // EMAIL | null | null | DATE
  return [[values.email, null, null, format(new Date(), FULL_DATE_TOKEN)]];
};

const addToCol = async (range, values) => {
  const sheets = await authorizeSheets();

  // TODO: Prevent multiple submissions by checking column values for same email
  return new Promise((resolve, reject) => {
    sheets.spreadsheets.values.append(
      {
        spreadsheetId: GOOGLE_SPREADSHEET_ID,
        range,
        valueInputOption: 'USER_ENTERED',
        insertDataOption: 'INSERT_ROWS',
        resource: {
          values: prepareResource(values)
        }
      },
      (err, response) => {
        if (err) {
          reject(err);
        } else {
          resolve(response);
        }
      }
    );
  });
};

exports.handler = async function(event, context, callback) {
  try {
    if (process.env.NODE_ENV === 'development') {
      return { statusCode: 201, body: 'saved email' };
    }

    const values = JSON.parse(event.body);
    const sheetsRes = await addToCol(GOOGLE_SPREADSHEET_WORKSHEET_ID, values);

    return {
      statusCode: sheetsRes.status,
      body: JSON.stringify(sheetsRes)
    };
  } catch (err) {
    console.log(err);
    return { statusCode: 500, body: err.toString() };
  }
};
