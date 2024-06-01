import fs from "node:fs";
import yaml from "yaml";
import { v4 } from "uuid";

type EpicHomesUserMap = {
    users: {
        data: Record<string, {
            userUUID: string,
            lastKnownName: string,
            homes?: Record<string, {
                homeName: string,
                homeWorld: string,
                homeX: number,
                homeY: number,
                homeZ: number,
                homeYaw: number,
                homePitch: number,
            }>
        }>
    }
}

// Data
let usersSQL = "";
let posDataSQL = "";
let posDataIndex = 0;
let savedPosSQL = "";
let savedPosIndex = 0;
let homesSQL = "";

// static data
const OVW_UUID = "";
const NET_UUID = "";
const END_UUID = "";
const SRV_NAME = "server";
const OVW_NAME = "world";
const NET_NAME = "world_nether";
const END_NAME = "world_the_end";
const TIMESTAMP = "1717244881442";

// Read yaml
const file = fs.readFileSync('./usermap.yml', 'utf8');
const parsed = yaml.parse(file) as EpicHomesUserMap;

for (const userUUID in parsed.users.data) {
    const userdata = parsed.users.data[userUUID];
    let totalHomesParsed = 0;
    usersSQL += `INSERT INTO "huskhomes_users" VALUES ('${userUUID}', '${userdata.lastKnownName}', NULL, NULL, NULL, 0, 0);\n`;
    if (userdata.homes)
        for (const homeName in userdata.homes) {
            const homeData = userdata.homes[homeName];
            const homeWorld = homeData.homeWorld;
            totalHomesParsed += 1;
            posDataIndex += 1;
            posDataSQL += `INSERT INTO "huskhomes_position_data" VALUES (${posDataIndex}, ${homeData.homeX}, ${homeData.homeY}, ${homeData.homeZ}, ${homeData.homeYaw}, ${homeData.homePitch}, '${homeWorld}', '${homeWorld == OVW_NAME ? OVW_UUID : homeWorld == NET_NAME ? NET_UUID : homeWorld == END_NAME ? END_UUID : "unknown"}', '${SRV_NAME}');\n`;
            savedPosIndex += 1;
            savedPosSQL += `INSERT INTO "huskhomes_saved_positions" VALUES (${savedPosIndex}, ${posDataIndex}, '${homeName}', '', NULL, ${TIMESTAMP});\n`;
            homesSQL += `INSERT INTO "huskhomes_homes" VALUES ('${v4()}', ${savedPosIndex}, '${userUUID}', 0);\n`;
        }
}

console.log(usersSQL);
console.log(posDataSQL);
console.log(savedPosSQL);
console.log(homesSQL);