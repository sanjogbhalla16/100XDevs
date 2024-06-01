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
function updateUsersTable(username, email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        yield client.connect();
        const insertQuery = "INSERT INTO users (username , email , password) VALUES ($1 ,$2,$3)";
        const values = [username, email, password];
        const result = yield client.query(insertQuery, values);
        console.log('Insertion success:', result); // Output insertion result
    });
}
updateUsersTable('username1', 'user1@example.com', 'user_password').catch(console.error);
function updateUsersAddress(user_id, city, country, street, pincode) {
    return __awaiter(this, void 0, void 0, function* () {
        const insertQuery = "INSERT INTO addresses (user_id, city, country, street, pincode) VALUES ($1, $2, $3, $4, $5)";
        const values = [user_id, city, country, street, pincode];
        const result = yield client.query(insertQuery, values);
        console.log('Insertion success:', result);
    });
}
updateUsersAddress(1, 'New York', 'USA', '123 Broadway St', '10001').catch(console.error);
