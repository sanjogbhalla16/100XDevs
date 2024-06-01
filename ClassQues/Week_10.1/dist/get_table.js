"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const client = new pg_1.Client({
    connectionString: "postgres://postgres"
});
function getUserTableData(email) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const query = 'SELECT * FROM users WHERE email = $1';
        const values = [email];
        const result = yield client.query(query, values);
        if (result.rows.length > 0) {
            console.log('user found:', result.rows[0]);
            return result.rows[0];
        }
        else {
            console.log('No user found with the given email.');
            return null; // Return null if no user was found
        }
    });
}
getUserTableData('user5@example.com').catch(console.error);
function getUserAndAddressTableData(user_id) {
    return __awaiter(this, void 0, void 0, function* () {
        const query = `SELECT users.id, users.username, users.email, addresses.city, addresses.country, addresses.street, addresses.pincode FROM users
    JOIN addresses ON users.id = addresses.user_id
    WHERE users.id = $1; `;
        const values = [user_id];
        const result = yield client.query(query, values);
        if (result.rows.length > 0) {
            console.log('user found:', result.rows[0]);
            return result.rows[0];
        }
        else {
            console.log('No address was found with the given user_id.');
            return null; // Return null if no user was found
        }
    });
}
getUserAndAddressTableData(1);
