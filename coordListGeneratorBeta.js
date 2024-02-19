/*
* Script Name: Coordinate List Generator
* Version: v1.1
* Last Updated: 2024-02-19
* Author: SaveBank
* Author Contact: Discord: savebank
* Contributor: RedAlert 
* Approved: Yes
* Approved Date: 2024-02-17
* Mod: RedAlert
*/


// User Input
if (typeof DEBUG !== 'boolean') DEBUG = false;

// CONSTANTS
var allIds = [
    // Player List
    "pl-players-Players",
    "pl-tribes-Tribes",
    "pl-excluded-players-Players",
    "pl-min-points",
    "pl-max-points",
    "pl-min-villages",
    "pl-max-villages",
    "pl-separator",

    // Village List
    "vl-players-Players",
    "vl-tribes-Tribes",
    "vl-min-x-coordinate",
    "vl-max-x-coordinate",
    "vl-min-y-coordinate",
    "vl-max-y-coordinate",
    "vl-min-points",
    "vl-max-points",
    "vl-image",
    "vl-raw-coordinates",

    // Fakelist
    "fl-recipient-players-Players",
    "fl-recipient-tribes-Tribes",
    "fl-ally-players-Players",
    "fl-ally-tribes-Tribes",
    "fl-enemy-players-Players",
    "fl-enemy-tribes-Tribes",
    "fl-min-distance",
    "fl-max-distance",
    "fl-min-points",
    "fl-max-points",
    "fl-fakes-per-player",
    "fl-filter-villages",
    "fl-image",
    "fl-display-targets",
    "fl-raw-coordinates",
    "fl-with-counts",
    "fl-ally-village-radius",
    "fl-number-ally-villages-radius",

    //Frontline
    "f-ally-players-Players",
    "f-ally-tribes-Tribes",
    "f-enemy-players-Players",
    "f-enemy-tribes-Tribes",
    "f-min-distance",
    "f-max-distance",
    "f-min-points",
    "f-max-points",
    "f-filter-villages",
    "f-image",
    "f-raw-coordinates",
    "f-ally-village-radius",
    "f-number-ally-villages-radius",
];
var buttonIDs = [
    "copy-f-frontline-display",
    "copy-fl-target-coordinates-display",
    "copy-fl-fakelist-display",
    "copy-vl-coordinates-display",
    "copy-pl-player-list-display"
];
var DEFAULT_MIN_VILLAGE_POINTS = 0;
var DEFAULT_MAX_VILLAGE_POINTS = 99999;
var DEFAULT_MIN_PLAYER_POINTS = 0;
var DEFAULT_MAX_PLAYER_POINTS = 99999999;
var DEFAULT_SEPARATOR = ",";
var DEFAULT_MIN_DISTANCE = 0;
var DEFAULT_MAX_DISTANCE = 9999;
var DEFAULT_FAKES_PER_PLAYER = 100;
var DEFAULT_MIN_X = 0;
var DEFAULT_MAX_X = 999;
var DEFAULT_MIN_Y = 0;
var DEFAULT_MAX_Y = 999;
var DEFAULT_MIN_VILLAGES = 0;
var DEFAULT_MAX_VILLAGES = 99999;
var DEFAULT_RADIUS = 10;
var DEFAULT_NUMBER_IN_RADIUS = 12;



var scriptConfig = {
    scriptData: {
        prefix: 'sbCLG',
        name: 'Coordinate List Generator',
        version: 'v1.1',
        author: 'SaveBank',
        authorUrl: 'https://forum.tribalwars.net/index.php?members/savebank.131111/',
        helpLink: 'https://forum.tribalwars.net/index.php?threads/coordinate-list-generator.292006/',
    },
    translations: {
        en_DK: {
            'Redirecting...': 'Redirecting...',
            Help: 'Help',
            'Coordinate List Generator': 'Coordinate List Generator',
            'Allied Players (Separate with \',\')': 'Allied Players<br>(Separate with \',\')',
            'Allied Tribes (Separate with \',\')': 'Allied Tribes<br>(Separate with \',\')',
            'Enemy Players (Separate with \',\')': 'Enemy Players<br>(Separate with \',\')',
            'Enemy Tribes (Separate with \',\')': 'Enemy Tribes<br>(Separate with \',\')',
            'Min Distance': 'Min Distance',
            'Max Distance': 'Max Distance',
            'Min Points': 'Min Points',
            'Max Points': 'Max Points',
            'Fakes per Player': 'Fakes per Player',
            'Image?': 'Image?',
            'Show Target Coordinates?': 'Show Target Coordinates?',
            'Raw Coordinates?': 'Raw Coordinates?',
            'Calculate Fakelist': 'Calculate Fakelist',
            'Start typing for suggestions ...': 'Start typing for suggestions ...',
            'Additional Options': 'Additional Options',
            'With Counts?': 'With Counts?',
            'Fakelist': 'Fakelist',
            'Village list': 'Village list',
            'Player list': 'Player list',
            'Frontline': 'Frontline',
            'Filter Deep Villages?': 'Filter Deep Villages?',
            'Radius': 'Radius',
            'Number of Ally Villages in Radius': 'Number of Ally Villages in Radius',
            'Filter allied villages if not enough other allied villages are nearby:': 'Filter allied villages if not enough other allied villages are nearby:',
            'Image:': 'Image:',
            'Fakelist:': 'Fakelist:',
            'Target Coordinates:': 'Target Coordinates:',
            'Copy': 'Copy',
            'Calculate Village List': 'Calculate Village List',
            'Coordinates:': 'Coordinates:',
            'Players (Separate with \',\')': 'Players (Separate with \',\')',
            'Tribes (Separate with \',\')': 'Tribes (Separate with \',\')',
            'Min X Coordinate': 'Min X Coordinate',
            'Max X Coordinate': 'Max X Coordinate',
            'Min Y Coordinate': 'Min Y Coordinate',
            'Max Y Coordinate': 'Max Y Coordinate',
            'Calculate Player List': 'Calculate Player List',
            'Separator:': 'Separator:',
            'Players:': 'Players:',
            'Min Villages': 'Min Villages',
            'Max Villages': 'Max Villages',
            'Frontline Coordinates:': 'Frontline Coordinates:',
            'Calculate Frontline': 'Calculate Frontline',
            'Exclude Players (Separate with \',\')': 'Exclude Players (Separate with \',\')',
            'No players or tribes selected': 'No players or tribes selected',
            'There was an error while fetching the data!': 'There was an error while fetching the data!',
            'There was an error!': 'There was an error!',
            'Min Player Points': 'Min Player Points',
            'Max Player Points': 'Max Player Points',
            'Min Village Points': 'Min Village Points',
            'Max Village Points': 'Max Village Points',
            'Calculating for': 'Calculating for',
            'Fakelist Recipients:': 'Fakelist Recipients:',
            'Reset Input': 'Reset Input',
        },
        de_DE: {
            'Redirecting...': 'Weiterleiten...',
            Help: 'Hilfe',
            'Coordinate List Generator': 'Koordinatenlisten Generator',
            'Allied Players (Separate with \',\')': 'Verbündete Spieler<br>(Getrennt durch \',\')',
            'Allied Tribes (Separate with \',\')': 'Verbündete Stämme<br>(Getrennt durch \',\')',
            'Enemy Players (Separate with \',\')': 'Feindliche Spieler<br>(Getrennt durch \',\')',
            'Enemy Tribes (Separate with \',\')': 'Feindliche Stämme<br>(Getrennt durch \',\')',
            'Min Distance': 'Min Entfernung',
            'Max Distance': 'Max Entfernung',
            'Min Points': 'Min Punkte',
            'Max Points': 'Max Punkte',
            'Fakes per Player': 'Fakes pro Spieler',
            'Image?': 'Bild?',
            'Show Target Coordinates?': 'Zielkoordinaten anzeigen?',
            'Raw Coordinates?': 'Unformatierte Koordinaten?',
            'Calculate Fakelist': 'Koordinatenliste berechnen',
            'Start typing for suggestions ...': 'Fang an zu tippen für Vorschläge ...',
            'Additional Options': 'Weitere Optionen',
            'With Counts?': 'Mit Anzahl?',
            'Fakelist': 'Fakeliste',
            'Village list': 'Dörferliste',
            'Player list': 'Spielerliste',
            'Frontline': 'Frontdörfer',
            'Filter Deep Villages?': 'Zecken filtern?',
            'Radius': 'Radius',
            'Number of Ally Villages in Radius': 'Anzahl verbündeter Dörfer im Radius',
            'Filter allied villages if not enough other allied villages are nearby:': 'Filter verbündete Dörfer wenn nicht genug andere verbündete Dörfer in der Nähe sind:',
            'Image:': 'Bild:',
            'Fakelist:': 'Fakeliste:',
            'Target Coordinates:': 'Target Coordinates:',
            'Copy': 'Kopieren',
            'Calculate Village List': 'Dörferliste berechnen',
            'Coordinates:': 'Koordinaten:',
            'Players (Separate with \',\')': 'Spieler<br>(Getrennt durch \',\')',
            'Tribes (Separate with \',\')': 'Stämme<br>(Getrennt durch \',\')',
            'Min X Coordinate': 'Min X Koordinate',
            'Max X Coordinate': 'Max X Koordinate',
            'Min Y Coordinate': 'Min Y Koordinate',
            'Max Y Coordinate': 'Max Y Koordinate',
            'Calculate Player List': 'Spielerliste berechnen',
            'Separator:': 'Trennzeichen:',
            'Players:': 'Spieler:',
            'Min Villages': 'Min Dörfer',
            'Max Villages': 'Max Dörfer',
            'Frontline Coordinates:': 'Frontline Koordinaten:',
            'Calculate Frontline': 'Frontline berechnen',
            'Exclude Players (Separate with \',\')': 'Ohne Spieler (Getrennt durch \',\')',
            'No players or tribes selected': 'Keine Spieler oder Stämme ausgwählt',
            'There was an error while fetching the data!': 'Es ist ein Fehler beim Abrufen der Daten aufgetreten!',
            'There was an error!': 'Es gab einen Fehler',
            'Min Player Points': 'Min Spielerpunkte',
            'Max Player Points': 'Max Spielerpunkte',
            'Min Village Points': 'Min Dörferpunkte',
            'Max Village Points': 'Max Dörferpunkte',
            'Calculating for': 'Berechne seit',
            'Fakelist Recipients:': 'Fakelisten Empfänger:',
            'Reset Input': 'Eingaben zurücksetzen',
        }
    }
    ,
    allowedMarkets: [],
    allowedScreens: ['overview_villages'],
    allowedModes: ['combined'],
    isDebug: DEBUG,
    enableCountApi: false
};





$.getScript(`https://twscripts.dev/scripts/twSDK.js?url=${document.currentScript.src}`,
    async function () {
        const startTime = performance.now();
        if (DEBUG) {
            console.debug(`Init`);
        }
        await twSDK.init(scriptConfig);
        const scriptInfo = twSDK.scriptInfo();
        const isValidScreen = twSDK.checkValidLocation('screen');
        const isValidMode = twSDK.checkValidLocation('mode');
        if (!isValidScreen && !isValidMode) {
            // Redirect to correct screen if necessary
            UI.InfoMessage(twSDK.tt('Redirecting...'));
            twSDK.redirectTo('overview_villages&combined');
            return;
        }
        const { tribes, players, villages } = await fetchWorldConfigData();
        const allCoords = villages.map(village => [village[2], village[3]]);
        const endTime = performance.now();
        if (DEBUG) console.debug(`${scriptInfo}: Startup time: ${(endTime - startTime).toFixed(2)} milliseconds`);
        if (DEBUG) console.debug(`${scriptInfo}: `, tribes);
        if (DEBUG) console.debug(`${scriptInfo}: `, players);
        if (DEBUG) console.debug(`${scriptInfo}: `, villages);
        // Entry point
        (async function () {
            try {
                const startTime = performance.now();
                renderUI();
                addEventHandlers();
                initializeInputFields();
                const endTime = performance.now();
                if (DEBUG) console.debug(`${scriptInfo}: Time to initialize: ${(endTime - startTime).toFixed(2)} milliseconds`);
            } catch (error) {
                UI.ErrorMessage(twSDK.tt('There was an error!'));
                console.error(`${scriptInfo}: Error:`, error);
            }
        })();

        function renderUI() {
            const startTime = performance.now();
            const style = generateCSS();
            const menuContent = renderDropdownMenu();
            const fakelistContent = renderFakelist();
            const villageListContent = renderVillageList();
            const playerListContent = renderPlayerList();
            const frontlineContent = renderFrontline();
            let content = `
            <div id="menu" class="sb-grid sb-grid-2">
                <div>
                    ${menuContent}
                </div>
                <div class="ra-tac">
                    <button id="resetInput" class="" >${twSDK.tt('Reset Input')}</button>
                </div>
            </div>
            <div id="fakelist">
                ${fakelistContent}
            </div>
            <div id="villagelist" style="display: none;">
                ${villageListContent}
            </div>
            <div id="playerlist" style="display: none;">
                ${playerListContent}
            </div>
            <div id="frontline" style="display: none;">
                ${frontlineContent}
            </div>
            `
            twSDK.renderBoxWidget(
                content,
                'FakelistGenerator',
                'fakelist-generator',
                style
            );

            const endTime = performance.now();
            if (DEBUG) console.debug(`${scriptInfo}: Time to render: ${(endTime - startTime).toFixed(2)} milliseconds`);
        }

        function addEventHandlers() {
            $('#selection-menu').on('change', function () {
                const selectedValue = $(this).val();
                $('#fakelist, #villagelist, #playerlist, #frontline').hide();
                $(`#${selectedValue}`).show();
                const localStorageSettings = getLocalStorage();
                localStorageSettings['selection-menu'] = selectedValue;
                saveLocalStorage(localStorageSettings);
                if (DEBUG) console.debug(`${scriptInfo}: selection-menu changed to ${selectedValue}`);
            });

            $('#resetInput').on('click', function () {
                const localStorageSettings = getLocalStorage();
                resetInputFields(localStorageSettings['selection-menu']);
            });

            $('#calculate-player-list').on('click', function () {
                calculatePlayerList();
            });

            $('#calculate-village-list').on('click', function () {
                calculateVillageList();
            });

            $('#calculate-fakelist').on('click', function () {
                calculateFakelist();
            });

            $('#calculate-frontline').on('click', function () {
                calculateFrontline();
            });

            buttonIDs.forEach(function (btnId) {
                $('#' + btnId).on('click', function () {
                    let textAreaId = btnId.replace('copy-', '');
                    let textareaContent = $('#' + textAreaId).val();
                    if (DEBUG) console.debug(`${scriptInfo}: Copied ${textareaContent} from ${textAreaId}`);
                    navigator.clipboard.writeText(textareaContent).then(function () {
                        console.log(`${scriptInfo}: Copying to clipboard was successful!`);
                    }, function (err) {
                        console.error(`${scriptInfo}: Error occurred copying to clipboard: `, err);
                    });
                });
            });

            $(document).ready(function () {
                allIds.forEach(function (id) {
                    $('#' + id).on('change', handleInputChange);
                });
            });
        }

        function calculateFakelist() {
            if (DEBUG) console.debug(`${scriptInfo}: Started calculation for the Fakelist`);
            const startTime = performance.now();
            const updateStartTime = Date.now();

            let updateTimer = 1000;
            resetOutput("fakelist");

            const localStorageSettings = getLocalStorage();
            let recipientPlayersInput = localStorageSettings["fl-recipient-players-Players"].split(",");
            let recipientTribesInput = localStorageSettings["fl-recipient-tribes-Tribes"].split(",");
            let allyPlayersInput = localStorageSettings["fl-ally-players-Players"].split(",");
            let allyTribesInput = localStorageSettings["fl-ally-tribes-Tribes"].split(",");
            let enemyPlayerInput = localStorageSettings["fl-enemy-players-Players"].split(",");
            let enemyTribesInput = localStorageSettings["fl-enemy-tribes-Tribes"].split(",");
            let minDistance = parseInt(localStorageSettings["fl-min-distance"]);
            let maxDistance = parseInt(localStorageSettings["fl-max-distance"]);
            let minPoints = parseInt(localStorageSettings["fl-min-points"]);
            let maxPoints = parseInt(localStorageSettings["fl-max-points"]);
            let fakesPerPlayer = parseInt(localStorageSettings["fl-fakes-per-player"]);
            let filterVillagesBool = parseBool(localStorageSettings["fl-filter-villages"]);
            let imageBool = parseBool(localStorageSettings["fl-image"]);
            let displayTargetsBool = parseBool(localStorageSettings["fl-display-targets"]);
            let rawCoordBool = parseBool(localStorageSettings["fl-raw-coordinates"]);
            let withCountsBool = parseBool(localStorageSettings["fl-with-counts"]);
            let allyVillageRadius = parseInt(localStorageSettings["fl-ally-village-radius"]);
            let numberInAllyVillageRadius = parseInt(localStorageSettings["fl-number-ally-villages-radius"]);

            let allyPlayerIds = [];
            let additionalAllyPlayerIds = [];

            let enemyPlayerIds = [];
            let additionalEnemyPlayerIds = [];

            allyPlayersInput = allyPlayersInput.filter(item => item);
            allyTribesInput = allyTribesInput.filter(item => item);

            enemyPlayerInput = enemyPlayerInput.filter(item => item);
            enemyTribesInput = enemyTribesInput.filter(item => item);


            // Ally ids
            allyTribesInput.forEach(tribeName => {
                let tribe = tribes.find(tribe => tribe[2] === tribeName);
                if (!tribe) {
                    console.warn(`${scriptInfo}: Tribe named ${tribeName} does not exist.`);
                    return;
                }
                let tribeId = tribe[0];
                players.forEach(player => {
                    if (player[2] === tribeId) {
                        allyPlayerIds.push(player[0]);
                    }
                });
            });

            allyPlayersInput.forEach(inputName => {
                let playerExists = players.find(player => player[1] === inputName);
                if (playerExists) {
                    additionalAllyPlayerIds.push(playerExists[0]);
                }
            });

            let finalAllyPlayerIds = [...new Set([...allyPlayerIds, ...additionalAllyPlayerIds])];

            if (DEBUG) console.debug(`${scriptInfo}: Ally Player Ids found in calculateFakelist(): `, finalAllyPlayerIds);

            // Enemy ids 
            enemyTribesInput.forEach(tribeName => {
                let tribe = tribes.find(tribe => tribe[2] === tribeName);
                if (!tribe) {
                    console.warn(`${scriptInfo}: Tribe named ${tribeName} does not exist.`);
                    return;
                }
                let tribeId = tribe[0];
                players.forEach(player => {
                    if (player[2] === tribeId) {
                        enemyPlayerIds.push(player[0]);
                    }
                });
            });

            enemyPlayerInput.forEach(inputName => {
                let playerExists = players.find(player => player[1] === inputName);
                if (playerExists) {
                    additionalEnemyPlayerIds.push(playerExists[0]);
                }
            });

            let finalEnemyPlayerIds = [...new Set([...enemyPlayerIds, ...additionalEnemyPlayerIds])];

            if (DEBUG) console.debug(`${scriptInfo}: Enemy Player Ids found in calculateFakelist(): `, finalEnemyPlayerIds);

            // Ally coordinates
            let allyCoordinates = villages
                .filter(village => finalAllyPlayerIds.includes(village[4]) &&
                    village[5] >= minPoints &&
                    village[5] <= maxPoints)
                .map(village => [village[2], village[3]]);

            if (DEBUG) console.debug(`${scriptInfo}: Ally Coordinates found in calculateFakelist(): `, allyCoordinates);
            // Enemy coordinates
            let enemyCoordinates = villages
                .filter(village => finalEnemyPlayerIds.includes(village[4]) &&
                    village[5] >= minPoints &&
                    village[5] <= maxPoints)
                .map(village => [village[2], village[3]]);

            if (DEBUG) console.debug(`${scriptInfo}: Enemy Coordinates found in calculateFakelist(): `, enemyCoordinates);
            // Filter ally coordinates
            let filteredAllyCoordinates = [];
            if (filterVillagesBool) {
                for (let i = 0; i < allyCoordinates.length; i++) {
                    if ((Date.now() - updateStartTime) > updateTimer) {
                        updateTimer += 1000;
                        console.log(twSDK.tt('Calculating for') + ' ' + (Date.now() - updateStartTime) + ' ms');
                    }
                    let centralVillage = allyCoordinates[i];
                    let nearbyVillages = 0;
                    for (let j = 0; j < allyCoordinates.length; j++) {
                        if (i === j) continue;
                        let compareVillage = allyCoordinates[j];
                        let distance = Math.sqrt(Math.pow(compareVillage[0] - centralVillage[0], 2) + Math.pow(compareVillage[1] - centralVillage[1], 2));
                        if (distance <= allyVillageRadius) nearbyVillages++;
                        if (nearbyVillages >= numberInAllyVillageRadius) break;
                    }
                    if (nearbyVillages >= numberInAllyVillageRadius) {
                        filteredAllyCoordinates.push(centralVillage);
                    }
                }
            } else {
                filteredAllyCoordinates = allyCoordinates;
            }
            if (DEBUG) console.debug(`${scriptInfo}: Filtered Ally Coordinates in calculateFakelist(): `, filteredAllyCoordinates);
            // Filter enemy coordinates
            let filteredEnemyCoordinates = [];
            if (minDistance > 0) {
                enemyCoordinates.forEach(enemyCoordinate => {
                    if ((Date.now() - updateStartTime) > updateTimer) {
                        updateTimer += 1000;
                        console.log(twSDK.tt('Calculating for') + ' ' + (Date.now() - updateStartTime) + ' ms');
                    }
                    let isTooClose = false;
                    for (let filteredAllyCoordinate of filteredAllyCoordinates) {
                        let distance = Math.sqrt(Math.pow(enemyCoordinate[0] - filteredAllyCoordinate[0], 2) +
                            Math.pow(enemyCoordinate[1] - filteredAllyCoordinate[1], 2));
                        if (distance < minDistance) {
                            isTooClose = true;
                            break;
                        }
                    }
                    if (!isTooClose) {
                        filteredEnemyCoordinates.push(enemyCoordinate);
                    }
                });
            } else {
                filteredEnemyCoordinates = enemyCoordinates;
            }
            if (DEBUG) console.debug(`${scriptInfo}: Filtered Enemy Coordinates in calculateFakelist(): `, filteredEnemyCoordinates);
            let finalEnemyCoordinates = [];

            filteredEnemyCoordinates.forEach(enemyCoordinate => {
                if ((Date.now() - updateStartTime) > updateTimer) {
                    updateTimer += 1000;
                    console.log(twSDK.tt('Calculating for') + ' ' + (Date.now() - updateStartTime) + ' ms');
                }
                for (let filteredAllyCoordinate of filteredAllyCoordinates) {
                    let distance = Math.sqrt(Math.pow(enemyCoordinate[0] - filteredAllyCoordinate[0], 2) +
                        Math.pow(enemyCoordinate[1] - filteredAllyCoordinate[1], 2));

                    if (distance >= minDistance && distance <= maxDistance) {
                        finalEnemyCoordinates.push(enemyCoordinate);
                        break;
                    }
                }
            });
            if (DEBUG) console.debug(`${scriptInfo}: Highlighted/Result Coordinates in calculateFakelist(): `, finalEnemyCoordinates);

            // Recipient ids
            let recipientPlayerIds = [];
            let additionalRecipientPlayerIds = [];

            recipientTribesInput.forEach(tribeName => {
                let tribe = tribes.find(tribe => tribe[2] === tribeName);
                if (!tribe) {
                    console.warn(`${scriptInfo}: Tribe named ${tribeName} does not exist.`);
                    return;
                }
                let tribeId = tribe[0];
                players.forEach(player => {
                    if (player[2] === tribeId) {
                        recipientPlayerIds.push(player[0]);
                    }
                });
            });

            recipientPlayersInput.forEach(inputName => {
                let playerExists = players.find(player => player[1] === inputName);
                if (playerExists) {
                    additionalRecipientPlayerIds.push(playerExists[0]);
                }
            });

            let finalRecipientPlayerIds = [...new Set([...recipientPlayerIds, ...additionalRecipientPlayerIds])];
            if (DEBUG) console.debug(`${scriptInfo}: Recipient Player Ids found in calculateFakelist(): `, finalRecipientPlayerIds);

            let finalRecipientPlayerIdsSet = new Set(finalRecipientPlayerIds);
            let finalRecipientPlayerNames = players
                .filter(player => finalRecipientPlayerIdsSet.has(player[0]))
                .map(player => player[1]);

            if (DEBUG) console.debug(`${scriptInfo}: Recipient playernames in calculateFakelist(): `, finalRecipientPlayerNames);

            let fakeListAssignments = {};
            let localFinalEnemyCoordinates = [...finalEnemyCoordinates];

            finalRecipientPlayerNames.forEach(player => {
                fakeListAssignments[player] = [];

                for (let i = 0; i < fakesPerPlayer; i++) {
                    if (localFinalEnemyCoordinates.length === 0)
                        localFinalEnemyCoordinates = [...finalEnemyCoordinates];
                    let randomIndex = Math.floor(Math.random() * localFinalEnemyCoordinates.length);
                    let coord = localFinalEnemyCoordinates.splice(randomIndex, 1)
                    fakeListAssignments[player].push(...coord);
                }
            });


            let output = "";


            // Counts how many times each coordinate appears
            const countOccurances = arr => arr.reduce((prev, curr) => (prev[curr] = ++prev[curr] || 1, prev), {});

            for (let player in fakeListAssignments) {
                output += `[player]${player}[/player]:\n[spoiler=Fakes]`; // Add player name to the output

                if (withCountsBool) {
                    // Get a count of how many times each coordinate appears
                    let counts = countOccurances(fakeListAssignments[player]);
                    let maxCount = Math.max(...Object.values(counts));

                    let index = 1;

                    // Loop through each count tier
                    for (let i = 1; i <= maxCount; i++) {
                        output += `[spoiler=${i}]\n`;
                        if (rawCoordBool) output += `[code]\n`;

                        // Loop through each coordinate
                        for (let coord of fakeListAssignments[player]) {
                            // If this coordinate should be printed in this tier
                            if (counts[coord] == i) {
                                if (rawCoordBool) {
                                    output += `${coord[0]}|${coord[1]} \n`;
                                } else {
                                    output += `${index}. ${coord[0]}|${coord[1]}\n`;
                                    index++;
                                }
                            }
                        }
                        if (rawCoordBool) output += `[/code]\n`;
                        output += `[/spoiler]\n`
                    }
                } else {
                    if (rawCoordBool) output += `[code]\n`;
                    fakeListAssignments[player].forEach((coordinate, index) => {
                        if (rawCoordBool) {
                            output += `${coordinate[0]}|${coordinate[1]} \n`;
                        } else {
                            output += `${index + 1}. ${coordinate[0]}|${coordinate[1]}\n`;
                        }
                    });
                    if (rawCoordBool) output += `[/code]\n`;
                }
                output += `[/spoiler]\n`
            }

            $('#fl-fakelist-display').val(output);

            if (imageBool) {
                let imageURL = createImage(finalEnemyCoordinates, allyCoordinates, enemyCoordinates);
                $(`#fl-image-display`).attr('src', imageURL);
                $(`#fl-image-div`).show();
            }

            if (displayTargetsBool) {
                let output_targets = "";

                if (rawCoordBool) {
                    finalEnemyCoordinates.forEach(([x, y]) => {
                        output_targets += `${x}|${y} `;  // '234|222 '
                    });
                } else {
                    finalEnemyCoordinates.forEach(([x, y], index) => {
                        output_targets += `${index + 1}. ${x}|${y}\n`;  // '3. 234|222'
                    });
                }
                output_targets = output_targets.trimEnd();
                $('#fl-target-coordinates-display').val(output_targets);
                $(`#fl-target-coordinates-div`).show();
            }

            $(`#fakelist-result`).show();

            const endTime = performance.now();
            if (DEBUG) console.debug(`${scriptInfo}: Calculation time for calculateFakelist(): ${(endTime - startTime).toFixed(2)} milliseconds`);

        }

        function calculateFrontline() {
            if (DEBUG) console.debug(`${scriptInfo}: Started calculation for the Frontline`);
            const startTime = performance.now();
            const updateStartTime = Date.now();

            let updateTimer = 1000;
            resetOutput("frontline");

            const localStorageSettings = getLocalStorage();
            let allyPlayersInput = localStorageSettings["f-ally-players-Players"].split(",");
            let allyTribesInput = localStorageSettings["f-ally-tribes-Tribes"].split(",");
            let enemyPlayerInput = localStorageSettings["f-enemy-players-Players"].split(",");
            let enemyTribesInput = localStorageSettings["f-enemy-tribes-Tribes"].split(",");
            let minDistance = parseInt(localStorageSettings["f-min-distance"]);
            let maxDistance = parseInt(localStorageSettings["f-max-distance"]);
            let minPoints = parseInt(localStorageSettings["f-min-points"]);
            let maxPoints = parseInt(localStorageSettings["f-max-points"]);
            let filterVillagesBool = parseBool(localStorageSettings["f-filter-villages"]);
            let imageBool = parseBool(localStorageSettings["f-image"]);
            let rawCoordBool = parseBool(localStorageSettings["f-raw-coordinates"]);
            let allyVillageRadius = parseInt(localStorageSettings["f-ally-village-radius"]);
            let numberInAllyVillageRadius = parseInt(localStorageSettings["f-number-ally-villages-radius"]);

            let allyPlayerIds = [];
            let additionalAllyPlayerIds = [];

            let enemyPlayerIds = [];
            let additionalEnemyPlayerIds = [];

            allyPlayersInput = allyPlayersInput.filter(item => item);
            allyTribesInput = allyTribesInput.filter(item => item);

            enemyPlayerInput = enemyPlayerInput.filter(item => item);
            enemyTribesInput = enemyTribesInput.filter(item => item);


            // Ally ids
            allyTribesInput.forEach(tribeName => {
                let tribe = tribes.find(tribe => tribe[2] === tribeName);
                if (!tribe) {
                    console.warn(`${scriptInfo}: Tribe named ${tribeName} does not exist.`);
                    return;
                }
                let tribeId = tribe[0];
                players.forEach(player => {
                    if (player[2] === tribeId) {
                        allyPlayerIds.push(player[0]);
                    }
                });
            });

            allyPlayersInput.forEach(inputName => {
                let playerExists = players.find(player => player[1] === inputName);
                if (playerExists) {
                    additionalAllyPlayerIds.push(playerExists[0]);
                }
            });

            let finalAllyPlayerIds = [...new Set([...allyPlayerIds, ...additionalAllyPlayerIds])];

            if (DEBUG) console.debug(`${scriptInfo}: Ally Player Ids found in calculateFrontline(): `, finalAllyPlayerIds);

            // Enemy ids 
            enemyTribesInput.forEach(tribeName => {
                let tribe = tribes.find(tribe => tribe[2] === tribeName);
                if (!tribe) {
                    console.warn(`${scriptInfo}: Tribe named ${tribeName} does not exist.`);
                    return;
                }
                let tribeId = tribe[0];
                players.forEach(player => {
                    if (player[2] === tribeId) {
                        enemyPlayerIds.push(player[0]);
                    }
                });
            });

            enemyPlayerInput.forEach(inputName => {
                let playerExists = players.find(player => player[1] === inputName);
                if (playerExists) {
                    additionalEnemyPlayerIds.push(playerExists[0]);
                }
            });

            let finalEnemyPlayerIds = [...new Set([...enemyPlayerIds, ...additionalEnemyPlayerIds])];
            if (enemyPlayerInput.length === 0 && enemyTribesInput.length === 0) {
                finalEnemyPlayerIds = [0];
            }

            if (DEBUG) console.debug(`${scriptInfo}: Enemy Player Ids found in calculateFrontline(): `, finalEnemyPlayerIds);

            // Ally coordinates
            let allyCoordinates = villages
                .filter(village => finalAllyPlayerIds.includes(village[4]) &&
                    village[5] >= minPoints &&
                    village[5] <= maxPoints)
                .map(village => [village[2], village[3]]);

            if (DEBUG) console.debug(`${scriptInfo}: Ally Coordinates found in calculateFrontline(): `, allyCoordinates);
            // Enemy coordinates
            let enemyCoordinates = villages
                .filter(village => finalEnemyPlayerIds.includes(village[4]) &&
                    village[5] >= minPoints &&
                    village[5] <= maxPoints)
                .map(village => [village[2], village[3]]);

            if (DEBUG) console.debug(`${scriptInfo}: Enemy Coordinates found in calculateFrontline(): `, enemyCoordinates);
            // Filter ally coordinates 
            // This is slow with a large number of villages
            let filteredAllyCoordinates = [];
            if (filterVillagesBool) {
                for (let i = 0; i < allyCoordinates.length; i++) {
                    if ((Date.now() - updateStartTime) > updateTimer) {
                        updateTimer += 1000;
                        console.log(twSDK.tt('Calculating for') + ' ' + (Date.now() - updateStartTime) + ' ms');
                    }
                    let centralVillage = allyCoordinates[i];
                    let nearbyVillages = 0;
                    for (let j = 0; j < allyCoordinates.length; j++) {
                        if (i === j) continue;
                        let compareVillage = allyCoordinates[j];
                        let distance = Math.sqrt(Math.pow(compareVillage[0] - centralVillage[0], 2) + Math.pow(compareVillage[1] - centralVillage[1], 2));
                        if (distance <= allyVillageRadius) nearbyVillages++;
                        if (nearbyVillages >= numberInAllyVillageRadius) break;
                    }
                    if (nearbyVillages >= numberInAllyVillageRadius) {
                        filteredAllyCoordinates.push(centralVillage);
                    }
                }
            } else {
                filteredAllyCoordinates = allyCoordinates;
            }
            if (DEBUG) console.debug(`${scriptInfo}: Filtered Ally Coordinates in calculateFrontline(): `, filteredAllyCoordinates);
            // Filter enemy coordinates
            // This is slow with a large number of villages
            let filteredEnemyCoordinates = [];
            if (minDistance > 0) {
                enemyCoordinates.forEach(enemyCoordinate => {
                    if ((Date.now() - updateStartTime) > updateTimer) {
                        updateTimer += 1000;
                        console.log(twSDK.tt('Calculating for') + ' ' + (Date.now() - updateStartTime) + ' ms');
                    }
                    let isTooClose = false;
                    for (let filteredAllyCoordinate of filteredAllyCoordinates) {
                        let distance = Math.sqrt(Math.pow(enemyCoordinate[0] - filteredAllyCoordinate[0], 2) +
                            Math.pow(enemyCoordinate[1] - filteredAllyCoordinate[1], 2));
                        if (distance < minDistance) {
                            isTooClose = true;
                            break;
                        }
                    }
                    if (!isTooClose) {
                        filteredEnemyCoordinates.push(enemyCoordinate);
                    }
                });
            } else {
                filteredEnemyCoordinates = enemyCoordinates;
            }
            if (DEBUG) console.debug(`${scriptInfo}: Filtered Enemy Coordinates in calculateFrontline(): `, filteredEnemyCoordinates);
            // This is slow with a large number of villages
            let finalEnemyCoordinates = [];

            filteredEnemyCoordinates.forEach(enemyCoordinate => {
                if ((Date.now() - updateStartTime) > updateTimer) {
                    updateTimer += 1000;
                    console.log(twSDK.tt('Calculating for') + ' ' + (Date.now() - updateStartTime) + ' ms');
                }
                for (let filteredAllyCoordinate of filteredAllyCoordinates) {
                    let distance = Math.sqrt(Math.pow(enemyCoordinate[0] - filteredAllyCoordinate[0], 2) +
                        Math.pow(enemyCoordinate[1] - filteredAllyCoordinate[1], 2));

                    if (distance >= minDistance && distance <= maxDistance) {
                        finalEnemyCoordinates.push(enemyCoordinate);
                        break;
                    }
                }
            });
            if (DEBUG) console.debug(`${scriptInfo}: Highlighted/Result Coordinates in calculateFrontline(): `, finalEnemyCoordinates);
            let output = "";

            if (rawCoordBool) {
                finalEnemyCoordinates.forEach(([x, y]) => {
                    output += `${x}|${y} `;  // '234|222 '
                });
            } else {
                finalEnemyCoordinates.forEach(([x, y], index) => {
                    output += `${index + 1}. ${x}|${y}\n`;  // '3. 234|222'
                });
            }
            output = output.trimEnd();
            $('#f-frontline-display').val(output);

            if (imageBool) {
                let imageURL = createImage(finalEnemyCoordinates, allyCoordinates, enemyCoordinates);
                $(`#f-image-display`).attr('src', imageURL);
                $(`#f-image-div`).show();
            }

            $(`#frontline-result`).show();

            const endTime = performance.now();
            if (DEBUG) console.debug(`${scriptInfo}: Calculation time for calculateFrontline(): ${(endTime - startTime).toFixed(2)} milliseconds`);
        }


        function calculatePlayerList() {
            if (DEBUG) console.debug(`${scriptInfo}: Started calculation for the PlayerList`);
            const startTime = performance.now();
            resetOutput("playerlist");

            const localStorageSettings = getLocalStorage();
            let tribeInput = localStorageSettings["pl-tribes-Tribes"].split(",");
            let playerInput = localStorageSettings["pl-players-Players"].split(",");
            let playersToExclude = localStorageSettings["pl-excluded-players-Players"].split(",");
            let minPoints = parseInt(localStorageSettings["pl-min-points"]);
            let maxPoints = parseInt(localStorageSettings["pl-max-points"]);
            let minVillages = parseInt(localStorageSettings["pl-min-villages"]);
            let maxVillages = parseInt(localStorageSettings["pl-max-villages"]);
            let separator = localStorageSettings["pl-separator"];
            let playerNames = [];
            let additionalPlayerNames = [];

            tribeInput = tribeInput.filter(item => item);
            playerInput = playerInput.filter(item => item);
            playersToExclude = playersToExclude.filter(item => item);

            if (playerInput.length === 0 && tribeInput.length === 0) {
                console.error(`${scriptInfo}: No player or tribes selected`);
                UI.ErrorMessage(twSDK.tt('No players or tribes selected'));
                return;
            }


            tribeInput.forEach(tribeName => {
                let tribe = tribes.find(tribe => tribe[2] === tribeName);
                if (!tribe) {
                    console.warn(`${scriptInfo}: Tribe named ${tribeName} does not exist.`);
                    return;
                }
                let tribeId = tribe[0];;
                players.forEach(player => {
                    if (player[2] === tribeId && !playersToExclude.includes(player[1]) &&
                        player[3] >= minVillages && player[3] <= maxVillages &&
                        player[4] >= minPoints && player[4] <= maxPoints) {
                        playerNames.push(player[1]);
                    }
                });
            });

            playerInput.forEach(inputName => {
                let playerExists = players.find(player => player[1] === inputName &&
                    player[3] >= minVillages && player[3] <= maxVillages &&
                    player[4] >= minPoints && player[4] <= maxPoints);
                if (playerExists && !playersToExclude.includes(inputName)) {
                    additionalPlayerNames.push(inputName);
                }
            });

            let finalPlayerNames = [...new Set([...playerNames, ...additionalPlayerNames])];

            let playerNamesString = finalPlayerNames.join(separator);
            $('#pl-player-list-display').val(playerNamesString);
            $(`#player-list-result`).show();
            const endTime = performance.now();
            if (DEBUG) console.debug(`${scriptInfo}: Calculation time for calculatePlayerList(): ${(endTime - startTime).toFixed(2)} milliseconds`);
        }

        function calculateVillageList() {
            if (DEBUG) console.debug(`${scriptInfo}: Started calculation for the VillageList`);
            const startTime = performance.now();
            resetOutput("villagelist");

            const localStorageSettings = getLocalStorage();
            let tribeInput = localStorageSettings["vl-tribes-Tribes"].split(",");
            let playerInput = localStorageSettings["vl-players-Players"].split(",");
            let minPoints = parseInt(localStorageSettings["vl-min-points"]);
            let maxPoints = parseInt(localStorageSettings["vl-max-points"]);
            let minXCoord = parseInt(localStorageSettings["vl-min-x-coordinate"]);
            let maxXCoord = parseInt(localStorageSettings["vl-max-x-coordinate"]);
            let minYCoord = parseInt(localStorageSettings["vl-min-y-coordinate"]);
            let maxYCoord = parseInt(localStorageSettings["vl-max-y-coordinate"]);
            let imageBool = parseBool(localStorageSettings["vl-image"]);
            let rawCoordBool = parseBool(localStorageSettings["vl-raw-coordinates"]);
            let playerIds = [];
            let additionalPlayerIds = [];

            tribeInput = tribeInput.filter(item => item);
            playerInput = playerInput.filter(item => item);



            tribeInput.forEach(tribeName => {
                let tribe = tribes.find(tribe => tribe[2] === tribeName);
                if (!tribe) {
                    console.warn(`${scriptInfo}: Tribe named ${tribeName} does not exist.`);
                    return;
                }
                let tribeId = tribe[0];
                players.forEach(player => {
                    if (player[2] === tribeId) {
                        playerIds.push(player[0]);
                    }
                });
            });

            playerInput.forEach(inputName => {
                let playerExists = players.find(player => player[1] === inputName);
                if (playerExists) {
                    additionalPlayerIds.push(playerExists[0]);
                }
            });

            let finalPlayerIds = [...new Set([...playerIds, ...additionalPlayerIds])];
            if (playerInput.length === 0 && tribeInput.length === 0) {
                finalPlayerIds = [0];
            }
            if (DEBUG) console.debug(`${scriptInfo}: Player Ids found in calculateVillageList(): `, finalPlayerIds);

            let coordinates = villages
                .filter(village => finalPlayerIds.includes(village[4]) &&
                    village[5] >= minPoints &&
                    village[5] <= maxPoints &&
                    village[2] >= minXCoord &&
                    village[2] <= maxXCoord &&
                    village[3] >= minYCoord &&
                    village[3] <= maxYCoord)
                .map(village => [village[2], village[3]]);

            if (DEBUG) console.debug(`${scriptInfo}: Coordinates found in calculateVillageList(): `, coordinates);

            let output = "";

            if (rawCoordBool) {
                coordinates.forEach(([x, y]) => {
                    output += `${x}|${y} `;  // '234|222 '
                });
            } else {
                coordinates.forEach(([x, y], index) => {
                    output += `${index + 1}. ${x}|${y}\n`;  // '3. 234|222'
                });
            }
            output = output.trimEnd();
            $('#vl-coordinates-display').val(output);

            let imageURL;

            if (imageBool) {
                imageURL = createImage(coordinates);
                $(`#vl-image-display`).attr('src', imageURL);
                $(`#vl-image-div`).show();
            }

            $(`#village-list-result`).show();
            const endTime = performance.now();
            if (DEBUG) console.debug(`${scriptInfo}: Calculation time for calculateVillageList(): ${(endTime - startTime).toFixed(2)} milliseconds`);

        }

        function renderDropdownMenu() {
            html = `
            <select id="selection-menu" class="ra-mb10">
                <option value="fakelist">${twSDK.tt('Fakelist')}</option>
                <option value="frontline">${twSDK.tt('Frontline')}</option>
                <option value="villagelist">${twSDK.tt('Village list')}</option>
                <option value="playerlist">${twSDK.tt('Player list')}</option>
            </select>
        `
            return html;
        }

        function renderPlayerList() {
            const dropdownPlayer = buildDropDown(players, "Players", "pl-players");
            const dropdownTribe = buildDropDown(tribes, "Tribes", "pl-tribes");
            const dropdownExcludedPlayer = buildDropDown(players, "Players", "pl-excluded-players");
            const copyButtonPlayerList = generateCopyButton("pl-player-list-display");

            let html =
                `
    <div class="sb-grid sb-grid-3 ra-mb10">
        <fieldset>
            <legend>${twSDK.tt('Players (Separate with \',\')')}</legend>
            ${dropdownPlayer}
        </fieldset>
        <fieldset>
            <legend>${twSDK.tt('Tribes (Separate with \',\')')}</legend>
            ${dropdownTribe}
        </fieldset>
        <fieldset>
            <legend>${twSDK.tt('Exclude Players (Separate with \',\')')}</legend>
            ${dropdownExcludedPlayer}
        </fieldset>
    </div>
    <div class="ra-mb10 sb-grid sb-grid-5">
        <fieldset>
            <legend>${twSDK.tt('Min Player Points')}</legend>
            <input type="number" id="pl-min-points" value="0"/>
        </fieldset>
        <fieldset>
            <legend>${twSDK.tt('Max Player Points')}</legend>
            <input type="number" id="pl-max-points" value="99999999"/>
        </fieldset>
        <fieldset>
            <legend>${twSDK.tt('Min Villages')}</legend>
            <input type="number" id="pl-min-villages" value="0"/>
        </fieldset>
        <fieldset>
            <legend>${twSDK.tt('Max Villages')}</legend>
            <input type="number" id="pl-max-villages" value="9999"/>
        </fieldset>
        <fieldset>
            <legend>${twSDK.tt('Separator:')}</legend>
            <input type="text" id="pl-separator" value=","/>
        </fieldset>
    </div>
    <div class="ra-mb10">
        <a href="javascript:void(0);" id="calculate-player-list" class="btn btn-confirm-yes onclick="">
            ${twSDK.tt('Calculate Player List')}
        </a>
    </div>
    <div id="player-list-result" style="display: none;">
        <fieldset>
            <legend>${twSDK.tt('Players:')}</legend>
            <textarea readonly id="pl-player-list-display" class="result-text"></textarea>
            ${copyButtonPlayerList}
        </fieldset>
    </div>
`

            return html;
        }

        function renderVillageList() {
            const dropdownAllyPlayer = buildDropDown(players, "Players", "vl-players");
            const dropdownAllyTribe = buildDropDown(tribes, "Tribes", "vl-tribes");
            const copyButtonVillageList = generateCopyButton("vl-coordinates-display");

            let html =
                `
        <div class="sb-grid sb-grid-2 ra-mb10">
            <fieldset>
                <legend>${twSDK.tt('Players (Separate with \',\')')}</legend>
                ${dropdownAllyPlayer}
            </fieldset>
            <fieldset>
                <legend>${twSDK.tt('Tribes (Separate with \',\')')}</legend>
                ${dropdownAllyTribe}
            </fieldset>
        </div>
        <div class="sb-grid sb-grid-4 ra-mb10">
            <fieldset>
                <legend>${twSDK.tt('Min X Coordinate')}</legend>
                <input type="number" id="vl-min-x-coordinate" value="0"/>
            </fieldset>
            <fieldset>
                <legend>${twSDK.tt('Max X Coordinate')}</legend>
                <input type="number" id="vl-max-x-coordinate" value="999"/>
            </fieldset>
            <fieldset>
                <legend>${twSDK.tt('Min Y Coordinate')}</legend>
                <input type="number" id="vl-min-y-coordinate" value="0"/>
            </fieldset>
            <fieldset>
                <legend>${twSDK.tt('Max Y Coordinate')}</legend>
                <input type="number" id="vl-max-y-coordinate" value="999"/>
            </fieldset>
        </div>
        <div class="ra-mb10 sb-grid sb-grid-25-25-50">
            <fieldset>
                <legend>${twSDK.tt('Min Village Points')}</legend>
                <input type="number" id="vl-min-points" value="0"/>
            </fieldset>
            <fieldset>
                <legend>${twSDK.tt('Max Village Points')}</legend>
                <input type="number" id="vl-max-points" value="99999"/>
            </fieldset>
            <fieldset>
                <legend>${twSDK.tt('Additional Options')}</legend>
                <div class ="sb-grid sb-grid-2 ra-mb10">
                    <div>
                        <label for="vl-image">${twSDK.tt('Image?')}</label>
                        <input type="checkbox" id="vl-image"/>
                    </div>
                    <div>
                        <label for="vl-raw-coordinates">${twSDK.tt('Raw Coordinates?')}</label>
                        <input type="checkbox" id="vl-raw-coordinates" />
                    </div>
                </div>
            </fieldset>
        </div>
        <div class="ra-mb10">
            <a href="javascript:void(0);" id="calculate-village-list" class="btn btn-confirm-yes onclick="">
                ${twSDK.tt('Calculate Village List')}
            </a>
        </div>
        <div id="village-list-result" style="display: none;">
            <fieldset>
                <legend>${twSDK.tt('Coordinates:')}</legend>
                <textarea readonly id="vl-coordinates-display" class="result-text"></textarea>
                ${copyButtonVillageList}
            </fieldset>
            <fieldset id="vl-image-div" style="display: none;">
                <legend>${twSDK.tt('Image:')}</legend>
                <img id="vl-image-display" src="" alt="Image"/>
            </fieldset>
        </div>
    `

            return html;
        }

        function renderFakelist() {
            const dropdownRecipientPlayer = buildDropDown(players, "Players", "fl-recipient-players");
            const dropdownRecipientTribe = buildDropDown(tribes, "Tribes", "fl-recipient-tribes");
            const dropdownAllyPlayer = buildDropDown(players, "Players", "fl-ally-players");
            const dropdownAllyTribe = buildDropDown(tribes, "Tribes", "fl-ally-tribes");
            const dropdownEnemyPlayer = buildDropDown(players, "Players", "fl-enemy-players");
            const dropdownEnemyTribe = buildDropDown(tribes, "Tribes", "fl-enemy-tribes");
            const copyButtonFakelist = generateCopyButton("fl-fakelist-display");
            const copyButtonTargetCoordinates = generateCopyButton("fl-target-coordinates-display");
            // Start building the HTML string
            let html =
                `
            <div class="ra-mb10">
                <fieldset class="sb-grid sb-grid-2">
                    <legend>${twSDK.tt('Fakelist Recipients:')}</legend>
                    <fieldset>
                        <legend>${twSDK.tt('Players (Separate with \',\')')}</legend>
                        ${dropdownRecipientPlayer}
                    </fieldset>
                    <fieldset>
                        <legend>${twSDK.tt('Tribes (Separate with \',\')')}</legend>
                        ${dropdownRecipientTribe}
                    </fieldset>
                </fieldset>
            </div>
            <div class="sb-grid sb-grid-4 ra-mb10">
                <fieldset>
                    <legend>${twSDK.tt('Allied Players (Separate with \',\')')}</legend>
                    ${dropdownAllyPlayer}
                </fieldset>
                <fieldset>
                    <legend>${twSDK.tt('Allied Tribes (Separate with \',\')')}</legend>
                    ${dropdownAllyTribe}
                </fieldset>
                <fieldset>
                    <legend>${twSDK.tt('Enemy Players (Separate with \',\')')}</legend>
                    ${dropdownEnemyPlayer}
                </fieldset>
                <fieldset>
                    <legend>${twSDK.tt('Enemy Tribes (Separate with \',\')')}</legend>
                    ${dropdownEnemyTribe}
                </fieldset>
            </div>
            <div class="sb-grid sb-grid-5 ra-mb10">
                <fieldset>
                    <legend>${twSDK.tt('Min Distance')}</legend>
                    <input type="number" id="fl-min-distance" value="0"/>
                </fieldset>
                <fieldset>
                    <legend>${twSDK.tt('Max Distance')}</legend>
                    <input type="number" id="fl-max-distance" value="99999"/>
                </fieldset>
                <fieldset>
                    <legend>${twSDK.tt('Min Village Points')}</legend>
                    <input type="number" id="fl-min-points" value="0"/>
                </fieldset>
                <fieldset>
                    <legend>${twSDK.tt('Max Village Points')}</legend>
                    <input type="number" id="fl-max-points" value="99999"/>
                </fieldset>
                <fieldset>
                    <legend>${twSDK.tt('Fakes per Player')}</legend>
                    <input type="number" id="fl-fakes-per-player" value="0" />
                </fieldset>
            </div>
            <div class="ra-mb10">
                <fieldset>
                    <legend>${twSDK.tt('Additional Options')}</legend>
                    <div class ="sb-grid sb-grid-5 ra-mb10">
                        <div>
                            <label for="fl-filter-villages">${twSDK.tt('Filter Deep Villages?')}</label>
                            <input type="checkbox" id="fl-filter-villages" />
                        </div>
                        <div>
                            <label for="fl-image">${twSDK.tt('Image?')}</label>
                            <input type="checkbox" id="fl-image"/>
                        </div>
                        <div>
                            <label for="fl-display-targets">${twSDK.tt('Show Target Coordinates?')}</label>
                            <input type="checkbox" id="fl-display-targets"/>
                        </div>
                        <div>
                            <label for="fl-raw-coordinates">${twSDK.tt('Raw Coordinates?')}</label>
                            <input type="checkbox" id="fl-raw-coordinates"/>
                        </div>
                        <div>
                            <label for="fl-with-counts">${twSDK.tt('With Counts?')}</label>
                            <input type="checkbox" id="fl-with-counts"/>
                        </div>
                    </div>
                    <div id="fl-filter-options" class="sb-grid sb-grid-3 ra-mb10 filter-village-options" style="display: none;">
                        <div class="info-text">
                            ${twSDK.tt('Filter allied villages if not enough other allied villages are nearby:')}
                        </div>
                        <fieldset>
                            <legend>${twSDK.tt('Radius')}</legend>
                            <input type="number" id="fl-ally-village-radius" value="10" />
                        </fieldset>
                        <fieldset>
                            <legend>${twSDK.tt('Number of Ally Villages in Radius')}</legend>
                            <input type="number" id="fl-number-ally-villages-radius" value="12" />
                        </fieldset>
                    </div>
                </fieldset>
            </div>
            <div class="ra-mb10">
                <a href="javascript:void(0);" id="calculate-fakelist" class="btn btn-confirm-yes onclick="">
                    ${twSDK.tt('Calculate Fakelist')}
                </a>
            </div>
            <div id="fakelist-result" style="display: none;">
                <fieldset>
                    <legend>${twSDK.tt('Fakelist:')}</legend>
                    <textarea readonly id="fl-fakelist-display" class="result-text"></textarea>
                    ${copyButtonFakelist}
                </fieldset>
                <fieldset id="fl-target-coordinates-div" style="display: none;">
                    <legend>${twSDK.tt('Target Coordinates:')}</legend>
                    <textarea readonly id="fl-target-coordinates-display" class="result-text"></textarea>
                    ${copyButtonTargetCoordinates}
                </fieldset>
                <fieldset id="fl-image-div" style="display: none;">
                    <legend>${twSDK.tt('Image:')}</legend>
                    <img id="fl-image-display" src="" alt="Image"/>
                </fieldset>
            </div>
        `

            return html;
        }

        function renderFrontline() {
            const dropdownAllyPlayer = buildDropDown(players, "Players", "f-ally-players");
            const dropdownAllyTribe = buildDropDown(tribes, "Tribes", "f-ally-tribes");
            const dropdownEnemyPlayer = buildDropDown(players, "Players", "f-enemy-players");
            const dropdownEnemyTribe = buildDropDown(tribes, "Tribes", "f-enemy-tribes");
            const copyButtonFrontline = generateCopyButton("f-frontline-display");
            // Start building the HTML string
            let html =
                `
            <div class="sb-grid sb-grid-4 ra-mb10">
                <fieldset>
                    <legend>${twSDK.tt('Allied Players (Separate with \',\')')}</legend>
                    ${dropdownAllyPlayer}
                </fieldset>
                <fieldset>
                    <legend>${twSDK.tt('Allied Tribes (Separate with \',\')')}</legend>
                    ${dropdownAllyTribe}
                </fieldset>
                <fieldset>
                    <legend>${twSDK.tt('Enemy Players (Separate with \',\')')}</legend>
                    ${dropdownEnemyPlayer}
                </fieldset>
                <fieldset>
                    <legend>${twSDK.tt('Enemy Tribes (Separate with \',\')')}</legend>
                    ${dropdownEnemyTribe}
                </fieldset>
            </div>
            <div class="sb-grid sb-grid-4 ra-mb10">
                <fieldset>
                    <legend>${twSDK.tt('Min Distance')}</legend>
                    <input type="number" id="f-min-distance" value="0"/>
                </fieldset>
                <fieldset>
                    <legend>${twSDK.tt('Max Distance')}</legend>
                    <input type="number" id="f-max-distance" value="99999"/>
                </fieldset>
                <fieldset>
                    <legend>${twSDK.tt('Min Village Points')}</legend>
                    <input type="number" id="f-min-points" value="0"/>
                </fieldset>
                <fieldset>
                    <legend>${twSDK.tt('Max Village Points')}</legend>
                    <input type="number" id="f-max-points" value="99999"/>
                </fieldset>
            </div>
            <div class="ra-mb10">
                <fieldset>
                    <legend>${twSDK.tt('Additional Options')}</legend>
                    <div class ="sb-grid sb-grid-3 ra-mb10">
                        <div>
                            <label for="f-filter-villages">${twSDK.tt('Filter Deep Villages?')}</label>
                            <input type="checkbox" id="f-filter-villages" />
                        </div>
                        <div>
                            <label for="f-image">${twSDK.tt('Image?')}</label>
                            <input type="checkbox" id="f-image"/>
                        </div>
                        <div>
                            <label for="f-raw-coordinates">${twSDK.tt('Raw Coordinates?')}</label>
                            <input type="checkbox" id="f-raw-coordinates" />
                        </div>
                    </div>
                    <div id="f-filter-options" class="sb-grid sb-grid-3 ra-mb10 filter-village-options" style="display: none;">
                        <div class="info-text">
                            ${twSDK.tt('Filter allied villages if not enough other allied villages are nearby:')}
                        </div>
                        <fieldset>
                            <legend>${twSDK.tt('Radius')}</legend>
                            <input type="number" id="f-ally-village-radius" value="10" />
                        </fieldset>
                        <fieldset>
                            <legend>${twSDK.tt('Number of Ally Villages in Radius')}</legend>
                            <input type="number" id="f-number-ally-villages-radius" value="12" />
                        </fieldset>
                    </div>
                </fieldset>
            </div>
            <div class="ra-mb10">
                <a href="javascript:void(0);" id="calculate-frontline" class="btn btn-confirm-yes onclick="">
                    ${twSDK.tt('Calculate Frontline')}
                </a>
            </div>
            <div id="frontline-result" style="display: none;">
                <fieldset>
                    <legend>${twSDK.tt('Frontline Coordinates:')}</legend>
                    <textarea readonly id="f-frontline-display" class="result-text"></textarea>
                    ${copyButtonFrontline}
                </fieldset>
                <fieldset id="f-image-div" style="display: none;">
                    <legend>${twSDK.tt('Image:')}</legend>
                    <img id="f-image-display" src="" alt="Image"/>
                </fieldset>
            </div>
        `

            return html;
        }

        function generateCSS() {
            // Start building the CSS string
            let css = `
                    .sb-grid-5 {
                        grid-template-columns: repeat(5, 1fr);
                    }
                    .sb-grid-4 {
                        grid-template-columns: repeat(4, 1fr);
                    }
                    .sb-grid-3 {
                        grid-template-columns: repeat(3, 1fr);
                    }
                    .sb-grid-2 {
                        grid-template-columns: repeat(2, 1fr);
                    }
                    .sb-grid-20-80 {
                        grid-template-columns: 20% 80%;
                    }
                    .sb-grid-25-25-50 {
                        grid-template-columns: calc(25% - 5px) calc(25% - 5px) calc(50% - 10px);
                    }
                    .sb-grid {
                        display: grid;
                        grid-gap: 10px;
                    }
                    .sb-grid {
                        display: grid;
                        grid-gap: 10px;
                    }
                    fieldset {
                        border: 1px solid #c1a264;
                        border-radius: 4px;
                        padding: 9px;
                    }
                    legend {
                        font-size: 12px; 
                        font-weight: bold; 
                    }
                    input[type="number"] {
                        padding: 8px;
                        font-size: 14px;
                        border: 1px solid #c1a264;
                        border-radius: 3px;
                        width: 90px;
                    }
                    input[type="checkbox"] {
                        margin-right: 5px;
                        transform: scale(1.2);
                    }
                    input[type="email"] {
                        padding: 8px;
                        font-size: 11px;
                        border: 1px solid #c1a264;
                        border-radius: 3px;
                        width: 100%; 
                    }
                    input[type="email"]::placeholder { 
                        font-style: italic;
                        font-size: 10px;
                    }
                    .btn-confirm-yes { 
                    padding: 3px; 
                    margin: 5px; 
                    }
                    input[type="number"]::-webkit-inner-spin-button,
                    input[type="number"]::-webkit-outer-spin-button,
                    input[type="number"] {
                        -webkit-appearance: none;
                        margin: 0;
                    }
                    input[type="number"] {
                        -moz-appearance: textfield;
                    }
                    input[type="number"]:focus,
                    input[type="checkbox"]:focus,
                    input[type="email"]:focus {
                        outline: none;
                        border-color: #92794e;
                        box-shadow: 0 0 5px rgba(193, 162, 100, 0.7);
                    }
                    select {
                        padding: 8px;
                        font-size: 14px;
                        border: 1px solid #c1a264;
                        border-radius: 3px;
                        width: 165px;
                    }
                    select:hover {
                        border-color: #92794e; 
                    }
                    
                    select:focus {
                        outline: none;
                        border-color: #92794e; 
                        box-shadow: 0 0 5px rgba(193, 162, 100, 0.7);
                    }
                    .info-text {
                        font-size: 12px; 
                        font-weight: bold;
                    }
                    .filter-village-options {
                        border: 1px solid #c1a264;
                        border-radius: 4px;
                        padding: 5px;
                    }
                    .result-text {
                        width: 100%;
                        height: 150px;
                        border: 1px solid #c1a264;
                        border-radius: 4px;
                        padding: 8px;
                        font-size: 14px;
                        margin-top: 5px;
                        resize: none;
                    }
                    .copy-button {
                        padding: 10px;
                        background-color: #c1a264;
                        color: #fff;
                        border: none;
                        border-radius: 4px;
                        cursor: pointer;
                    }
                    .copy-button:hover {
                        background-color: #a0884e;
                    }
                    #resetInput {
                        padding: 8px;
                        font-size: 11.5px;
                        color: white;
                        font-weight: bold;
                        background: #af281d;
                        background: linear-gradient(to bottom, #af281d 0%,#801006 100%);
                        border: 1px solid;
                        border-color: #006712;
                        border-radius: 3px;
                        cursor: pointer;
                        
                    }
                    #resetInput:hover {
                        background: #c92722;
                        background: linear-gradient(to bottom, #c92722 0%,#a00d08 100%);
                    }
                    #pl-separator {
                        font-size: 15px;
                        width: 100%;
                    }
            `;

            return css;
        }
        function createImage(hightlightedVillagesCoordinates, allyCoordinates = [], enemyCoordinates = []) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            const minX = Math.max(0, Math.min(...allCoords.map(([x]) => x)) - 20);
            const minY = Math.max(0, Math.min(...allCoords.map(([, y]) => y)) - 20);
            const maxX = Math.min(1000, Math.max(...allCoords.map(([x]) => x)) + 20);
            const maxY = Math.min(1000, Math.max(...allCoords.map(([, y]) => y)) + 20);

            // Set canvas size based on cropping boundaries
            canvas.width = maxX - minX;
            canvas.height = maxY - minY;

            // Draw a green square
            ctx.fillStyle = 'green';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            // Function to set pixel color at given coordinates within the cropped area
            function setPixelColor(x, y, color) {
                ctx.fillStyle = color;
                ctx.fillRect(x - minX, y - minY, 1, 1);
            }

            allCoords.forEach(([x, y]) => {
                if (x >= minX && x < maxX && y >= minY && y < maxY) {
                    setPixelColor(x, y, 'brown');
                }
            });

            // Set blue pixels within the cropped area
            allyCoordinates.forEach(([x, y]) => {
                if (x >= minX && x < maxX && y >= minY && y < maxY) {
                    setPixelColor(x, y, 'blue');
                }
            });

            // Set red pixels within the cropped area
            enemyCoordinates.forEach(([x, y]) => {
                if (x >= minX && x < maxX && y >= minY && y < maxY) {
                    setPixelColor(x, y, 'red');
                }
            });

            // Set yellow pixels within the cropped area
            hightlightedVillagesCoordinates.forEach(([x, y]) => {
                if (x >= minX && x < maxX && y >= minY && y < maxY) {
                    setPixelColor(x, y, 'yellow');
                }
            });

            // Convert canvas to Data URL
            const dataUrl = canvas.toDataURL();

            return dataUrl;
        }
        function parseBool(input) {
            if (typeof input === 'string') {
                return input.toLowerCase() === 'true';
            } else if (typeof input === 'boolean') {
                return input;
            } else {
                console.error(`${scriptInfo}: Invalid input: needs to be a string or boolean.`);
                return false;
            }
        }
        // Replace if its added to twSDK
        function buildDropDown(array, entity, prefixId = 'ra') {
            let sortedArray;
            if (entity === 'Tribes') {
                sortedArray = array.sort((a, b) => a[7] - b[7]);
            } else if (entity === 'Players') {
                sortedArray = array.sort((a, b) => a[5] - b[5]);
            } else {
                sortedArray = array;
            }
            let dropdown = `<input type="email" class="${prefixId}-input" multiple list="${prefixId}-select-${entity}" placeholder="${twSDK.tt(
                'Start typing for suggestions ...'
            )}" id="${prefixId}-${entity}"><datalist id="${prefixId}-select-${entity}">`;
            sortedArray.forEach((item) => {
                if (item.length > 0 && item[0].length !== 0) {
                    if (entity === 'Tribes') {
                        const [id, _, tag] = item;
                        const cleanTribeTag = twSDK.cleanString(tag);
                        dropdown += `<option value="${cleanTribeTag}">`;
                    } else if (entity === 'Players') {
                        const [id, name] = item;
                        const cleanPlayerName = twSDK.cleanString(name);
                        dropdown += `<option value="${cleanPlayerName}">`;
                    } else {
                        dropdown += `<option value="${item}">`;
                    }
                }
            });
            dropdown += '</datalist>';
            return dropdown;
        }
        function generateCopyButton(id) {
            return `
                <button id="copy-${id}" onclick="" class="btn">
                    ${twSDK.tt('Copy')}
                </button>
            `;
        }

        function resetOutput(input) {
            switch (input) {
                case 'fakelist':
                    if (DEBUG) console.debug(`${scriptInfo}: Reset output for ${input}`);
                    $(`#fakelist-result`).hide();
                    $(`#fl-fakelist-display`).val("");
                    $(`#fl-target-coordinates-div`).hide();
                    $(`#fl-target-coordinates-display`).val("");
                    $(`#fl-image-div`).hide();
                    $(`#fl-image-display`).attr('src', "");
                    break;
                case 'villagelist':
                    if (DEBUG) console.debug(`${scriptInfo}: Reset output for ${input}`);
                    $(`#village-list-result`).hide();
                    $(`#vl-coordinates-display`).val("");
                    $(`#vl-image-div`).hide();
                    $(`#vl-image-display`).attr('src', "");
                    break;
                case 'playerlist':
                    if (DEBUG) console.debug(`${scriptInfo}: Reset output for ${input}`);
                    $(`#player-list-result`).hide();
                    $(`#pl-player-list-display`).val("");
                    break;
                case 'frontline':
                    if (DEBUG) console.debug(`${scriptInfo}: Reset output for ${input}`);
                    $(`#frontline-result`).hide();
                    $(`#f-frontline-display`).val("");
                    $(`#f-image-div`).hide();
                    $(`#f-image-display`).attr('src', "");
                    break;
                default:
                    console.error(`${scriptInfo}: Can't reset output for ${input}`);
            }
        }

        function initializeInputFields() {
            const settingsObject = getLocalStorage();
            if (DEBUG) console.debug(`${scriptInfo}: Settings object from local storage: `, settingsObject);

            for (let id in settingsObject) {
                if (settingsObject.hasOwnProperty(id)) {
                    const element = document.getElementById(id);

                    if (element && element.type === 'checkbox') {
                        element.checked = settingsObject[id] === true;
                        if (id === 'fl-filter-villages') {
                            if (parseBool(settingsObject[id])) {
                                $(`#fl-filter-options`).show();
                            } else {
                                $(`#fl-filter-options`).hide();
                            }
                        }
                        if (id === 'f-filter-villages') {
                            if (parseBool(settingsObject[id])) {
                                $(`#f-filter-options`).show();
                            } else {
                                $(`#f-filter-options`).hide();
                            }
                        }
                    } else if (element && id === 'selection-menu') {
                        $('#fakelist, #villagelist, #playerlist, #frontline').hide();
                        $(`#${settingsObject[id]}`).show();
                        element.value = settingsObject[id];
                    } else if (element) {
                        element.value = settingsObject[id];
                    } else {
                        console.error(`${scriptInfo}: Element not found for ID: ${id} in `, settingsObject);
                    }
                }
            }
        }
        function handleInputChange() {
            const inputId = $(this).attr('id');
            let inputValue;

            switch (inputId) {
                case "pl-players-Players":
                    inputValue = $(this).val();
                    if (!inputValue.trim()) {
                        $(this).val(inputValue);
                        break;
                    }
                    const plPlayers = inputValue.split(",").filter(player => player.trim() !== "");
                    const plUniquePlayers = [...new Set(plPlayers)];
                    inputValue = plUniquePlayers.join(",");
                    $(this).val(inputValue);
                    break;
                case "pl-tribes-Tribes":
                    inputValue = $(this).val();
                    if (!inputValue.trim()) {
                        $(this).val(inputValue);
                        break;
                    }
                    const plTribes = inputValue.split(",").filter(tribe => tribe.trim() !== "");
                    const plUniqueTribes = [...new Set(plTribes)];
                    inputValue = plUniqueTribes.join(",");
                    $(this).val(inputValue);
                    break;
                case "pl-excluded-players-Players":
                    inputValue = $(this).val();
                    if (!inputValue.trim()) {
                        $(this).val(inputValue);
                        break;
                    }
                    const plExcludedPlayers = inputValue.split(",").filter(player => player.trim() !== "");
                    const plUniqueExcludedPlayers = [...new Set(plExcludedPlayers)];
                    inputValue = plUniqueExcludedPlayers.join(",");
                    $(this).val(inputValue);
                    break;
                case "pl-min-points":
                    inputValue = isNaN(parseInt($(this).val())) ? DEFAULT_MIN_PLAYER_POINTS : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(DEFAULT_MIN_PLAYER_POINTS);
                        inputValue = DEFAULT_MIN_PLAYER_POINTS;
                    } else {
                        $(this).val(inputValue)
                    }
                    break;
                case "pl-max-points":
                    inputValue = isNaN(parseInt($(this).val())) ? DEFAULT_MAX_PLAYER_POINTS : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(DEFAULT_MAX_PLAYER_POINTS);
                        inputValue = DEFAULT_MAX_PLAYER_POINTS;
                    } else {
                        $(this).val(inputValue)
                    }
                    break;
                case "pl-min-villages":
                    inputValue = isNaN(parseInt($(this).val())) ? DEFAULT_MIN_VILLAGES : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(DEFAULT_MIN_VILLAGES);
                        inputValue = DEFAULT_MIN_VILLAGES;
                    } else {
                        $(this).val(inputValue)
                    }
                    break;
                case "pl-max-villages":
                    inputValue = isNaN(parseInt($(this).val())) ? DEFAULT_MAX_VILLAGES : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(DEFAULT_MAX_VILLAGES);
                        inputValue = DEFAULT_MAX_VILLAGES;
                    } else {
                        $(this).val(inputValue)
                    }
                    break;
                case "pl-separator":
                    inputValue = $(this).val();
                    break;
                case "vl-players-Players":
                    inputValue = $(this).val();
                    if (!inputValue.trim()) {
                        $(this).val(inputValue);
                        break;
                    }
                    const vlPlayers = inputValue.split(",").filter(player => player.trim() !== "");
                    const vlUniquePlayers = [...new Set(vlPlayers)];
                    inputValue = vlUniquePlayers.join(",");
                    $(this).val(inputValue);
                    break;
                case "vl-tribes-Tribes":
                    inputValue = $(this).val();
                    if (!inputValue.trim()) {
                        $(this).val(inputValue);
                        break;
                    }
                    const vlTribes = inputValue.split(",").filter(tribe => tribe.trim() !== "");
                    const vlUniqueTribes = [...new Set(vlTribes)];
                    inputValue = vlUniqueTribes.join(",");
                    $(this).val(inputValue);
                    break;
                case "vl-min-x-coordinate":
                    inputValue = isNaN(parseInt($(this).val())) ? DEFAULT_MIN_X : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(DEFAULT_MIN_X);
                        inputValue = DEFAULT_MIN_X;
                    } else {
                        $(this).val(inputValue)
                    }
                    break;
                case "vl-max-x-coordinate":
                    inputValue = isNaN(parseInt($(this).val())) ? DEFAULT_MAX_X : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(DEFAULT_MAX_X);
                        inputValue = DEFAULT_MAX_X;
                    } else {
                        $(this).val(inputValue)
                    }
                    break;
                case "vl-min-y-coordinate":
                    inputValue = isNaN(parseInt($(this).val())) ? DEFAULT_MIN_Y : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(DEFAULT_MIN_Y);
                        inputValue = DEFAULT_MIN_Y;
                    } else {
                        $(this).val(inputValue)
                    }
                    break;
                case "vl-max-y-coordinate":
                    inputValue = isNaN(parseInt($(this).val())) ? DEFAULT_MAX_Y : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(DEFAULT_MAX_Y);
                        inputValue = DEFAULT_MAX_Y;
                    } else {
                        $(this).val(inputValue)
                    }
                    break;
                case "vl-min-points":
                    inputValue = isNaN(parseInt($(this).val())) ? DEFAULT_MIN_VILLAGE_POINTS : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(DEFAULT_MIN_VILLAGE_POINTS);
                        inputValue = DEFAULT_MIN_VILLAGE_POINTS;
                    } else {
                        $(this).val(inputValue)
                    }
                    break;
                case "vl-max-points":
                    inputValue = isNaN(parseInt($(this).val())) ? DEFAULT_MAX_VILLAGE_POINTS : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(DEFAULT_MAX_VILLAGE_POINTS);
                        inputValue = DEFAULT_MAX_VILLAGE_POINTS;
                    } else {
                        $(this).val(inputValue)
                    }
                    break;
                case "vl-image":
                    inputValue = $(this).prop("checked");
                    break;
                case "vl-raw-coordinates":
                    inputValue = $(this).prop("checked");
                    break;
                case "fl-recipient-players-Players":
                    inputValue = $(this).val();
                    if (!inputValue.trim()) {
                        $(this).val(inputValue);
                        break;
                    }
                    const flRecipientPlayers = inputValue.split(",").filter(player => player.trim() !== "");
                    const flUniqueRecipientPlayers = [...new Set(flRecipientPlayers)];
                    inputValue = flUniqueRecipientPlayers.join(",");
                    $(this).val(inputValue);
                    break;
                case "fl-recipient-tribes-Tribes":
                    inputValue = $(this).val();
                    if (!inputValue.trim()) {
                        $(this).val(inputValue);
                        break;
                    }
                    const flRecipientTribes = inputValue.split(",").filter(tribe => tribe.trim() !== "");
                    const flUniqueRecipientTribes = [...new Set(flRecipientTribes)];
                    inputValue = flUniqueRecipientTribes.join(",");
                    $(this).val(inputValue);
                    break;
                case "fl-ally-players-Players":
                    inputValue = $(this).val();
                    if (!inputValue.trim()) {
                        $(this).val(inputValue);
                        break;
                    }
                    const flAllyPlayers = inputValue.split(",").filter(player => player.trim() !== "");
                    const flUniqueAllyPlayers = [...new Set(flAllyPlayers)];
                    inputValue = flUniqueAllyPlayers.join(",");
                    $(this).val(inputValue);
                    break;
                case "fl-ally-tribes-Tribes":
                    inputValue = $(this).val();
                    if (!inputValue.trim()) {
                        $(this).val(inputValue);
                        break;
                    }
                    const flAllyTribes = inputValue.split(",").filter(tribe => tribe.trim() !== "");
                    const flUniqueAllyTribes = [...new Set(flAllyTribes)];
                    inputValue = flUniqueAllyTribes.join(",");
                    $(this).val(inputValue);
                    break;
                case "fl-enemy-players-Players":
                    inputValue = $(this).val();
                    if (!inputValue.trim()) {
                        $(this).val(inputValue);
                        break;
                    }
                    const flEnemyPlayers = inputValue.split(",").filter(player => player.trim() !== "");
                    const flUniqueEnemyPlayers = [...new Set(flEnemyPlayers)];
                    inputValue = flUniqueEnemyPlayers.join(",");
                    $(this).val(inputValue);
                    break;
                case "fl-enemy-tribes-Tribes":
                    inputValue = $(this).val();
                    if (!inputValue.trim()) {
                        $(this).val(inputValue);
                        break;
                    }
                    const flEnemyTribes = inputValue.split(",").filter(tribe => tribe.trim() !== "");
                    const flUniqueEnemyTribes = [...new Set(flEnemyTribes)];
                    inputValue = flUniqueEnemyTribes.join(",");
                    $(this).val(inputValue);
                    break;
                case "fl-min-distance":
                    inputValue = isNaN(parseInt($(this).val())) ? DEFAULT_MIN_DISTANCE : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(DEFAULT_MIN_DISTANCE);
                        inputValue = DEFAULT_MIN_DISTANCE;
                    } else {
                        $(this).val(inputValue)
                    }
                    break;
                case "fl-max-distance":
                    inputValue = isNaN(parseInt($(this).val())) ? DEFAULT_MAX_DISTANCE : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(DEFAULT_MAX_DISTANCE);
                        inputValue = DEFAULT_MAX_DISTANCE;
                    } else {
                        $(this).val(inputValue)
                    }
                    break;
                case "fl-min-points":
                    inputValue = isNaN(parseInt($(this).val())) ? DEFAULT_MIN_VILLAGE_POINTS : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(DEFAULT_MIN_VILLAGE_POINTS);
                        inputValue = DEFAULT_MIN_VILLAGE_POINTS;
                    } else {
                        $(this).val(inputValue)
                    }
                    break;
                case "fl-max-points":
                    inputValue = isNaN(parseInt($(this).val())) ? DEFAULT_MAX_VILLAGE_POINTS : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(DEFAULT_MAX_VILLAGE_POINTS);
                        inputValue = DEFAULT_MAX_VILLAGE_POINTS;
                    } else {
                        $(this).val(inputValue)
                    }
                    break;
                case "fl-fakes-per-player":
                    inputValue = isNaN(parseInt($(this).val())) ? DEFAULT_FAKES_PER_PLAYER : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(DEFAULT_FAKES_PER_PLAYER);
                        inputValue = DEFAULT_FAKES_PER_PLAYER;
                    } else {
                        $(this).val(inputValue)
                    }
                    break;
                case "fl-filter-villages":
                    inputValue = $(this).prop("checked");
                    if (inputValue === true) {
                        $(`#fl-filter-options`).show();
                    } else {
                        $(`#fl-filter-options`).hide();
                    }
                    break;
                case "fl-image":
                    inputValue = $(this).prop("checked");
                    break;
                case "fl-display-targets":
                    inputValue = $(this).prop("checked");
                    break;
                case "fl-raw-coordinates":
                    inputValue = $(this).prop("checked");
                    break;
                case "fl-with-counts":
                    inputValue = $(this).prop("checked");
                    break;
                case "fl-ally-village-radius":
                    inputValue = isNaN(parseInt($(this).val())) ? DEFAULT_RADIUS : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(DEFAULT_RADIUS);
                        inputValue = DEFAULT_RADIUS;
                    } else {
                        $(this).val(inputValue)
                    }
                    break;
                case "fl-number-ally-villages-radius":
                    inputValue = isNaN(parseInt($(this).val())) ? DEFAULT_NUMBER_IN_RADIUS : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(DEFAULT_NUMBER_IN_RADIUS);
                        inputValue = DEFAULT_NUMBER_IN_RADIUS;
                    } else {
                        $(this).val(inputValue)
                    }
                    break;
                case "f-ally-players-Players":
                    inputValue = $(this).val();
                    if (!inputValue.trim()) {
                        $(this).val(inputValue);
                        break;
                    }
                    const fAllyPlayers = inputValue.split(",").filter(player => player.trim() !== "");
                    const fUniqueAllyPlayers = [...new Set(fAllyPlayers)];
                    inputValue = fUniqueAllyPlayers.join(",");
                    $(this).val(inputValue);
                    break;
                case "f-ally-tribes-Tribes":
                    inputValue = $(this).val();
                    if (!inputValue.trim()) {
                        $(this).val(inputValue);
                        break;
                    }
                    const fAllyTribes = inputValue.split(",").filter(tribe => tribe.trim() !== "");
                    const fUniqueAllyTribes = [...new Set(fAllyTribes)];
                    inputValue = fUniqueAllyTribes.join(",");
                    $(this).val(inputValue);
                    break;
                case "f-enemy-players-Players":
                    inputValue = $(this).val();
                    if (!inputValue.trim()) {
                        $(this).val(inputValue);
                        break;
                    }
                    const fEnemyPlayers = inputValue.split(",").filter(player => player.trim() !== "");
                    const fUniqueEnemyPlayers = [...new Set(fEnemyPlayers)];
                    inputValue = fUniqueEnemyPlayers.join(",");
                    $(this).val(inputValue);
                    break;
                case "f-enemy-tribes-Tribes":
                    inputValue = $(this).val();
                    if (!inputValue.trim()) {
                        $(this).val(inputValue);
                        break;
                    }
                    const fEnemyTribes = inputValue.split(",").filter(tribe => tribe.trim() !== "");
                    const fUniqueEnemyTribes = [...new Set(fEnemyTribes)];
                    inputValue = fUniqueEnemyTribes.join(",");
                    $(this).val(inputValue);
                    break;
                case "f-min-distance":
                    inputValue = isNaN(parseInt($(this).val())) ? DEFAULT_MIN_DISTANCE : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(DEFAULT_MIN_DISTANCE);
                        inputValue = DEFAULT_MIN_DISTANCE;
                    } else {
                        $(this).val(inputValue)
                    }
                    break;
                case "f-max-distance":
                    inputValue = isNaN(parseInt($(this).val())) ? DEFAULT_MAX_DISTANCE : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(DEFAULT_MAX_DISTANCE);
                        inputValue = DEFAULT_MAX_DISTANCE;
                    } else {
                        $(this).val(inputValue)
                    }
                    break;
                case "f-min-points":
                    inputValue = isNaN(parseInt($(this).val())) ? DEFAULT_MIN_VILLAGE_POINTS : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(DEFAULT_MIN_VILLAGE_POINTS);
                        inputValue = DEFAULT_MIN_VILLAGE_POINTS;
                    } else {
                        $(this).val(inputValue)
                    }
                    break;
                case "f-max-points":
                    inputValue = isNaN(parseInt($(this).val())) ? DEFAULT_MAX_VILLAGE_POINTS : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(DEFAULT_MAX_VILLAGE_POINTS);
                        inputValue = DEFAULT_MAX_VILLAGE_POINTS;
                    } else {
                        $(this).val(inputValue)
                    }
                    break;
                case "f-filter-villages":
                    inputValue = $(this).prop("checked");
                    if (inputValue === true) {
                        $(`#f-filter-options`).show();
                    } else {
                        $(`#f-filter-options`).hide();
                    }
                    break;
                case "f-image":
                    inputValue = $(this).prop("checked");
                    break;
                case "f-raw-coordinates":
                    inputValue = $(this).prop("checked");
                    break;
                case "f-ally-village-radius":
                    inputValue = isNaN(parseInt($(this).val())) ? DEFAULT_RADIUS : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(DEFAULT_RADIUS);
                        inputValue = DEFAULT_RADIUS;
                    } else {
                        $(this).val(inputValue)
                    }
                    break;
                case "f-number-ally-villages-radius":
                    inputValue = isNaN(parseInt($(this).val())) ? DEFAULT_NUMBER_IN_RADIUS : parseInt($(this).val());
                    if (inputValue < 0) {
                        $(this).val(DEFAULT_NUMBER_IN_RADIUS);
                        inputValue = DEFAULT_NUMBER_IN_RADIUS;
                    } else {
                        $(this).val(inputValue)
                    }
                    break;
                default:
                    console.error(`${scriptInfo}: Unknown id: ${inputId}`)
            }
            if (DEBUG) console.debug(`${scriptInfo}: ${inputId} changed to ${inputValue}`)
            const settingsObject = getLocalStorage();
            settingsObject[inputId] = inputValue;
            saveLocalStorage(settingsObject);
        }
        function resetInputFields(inputString) {
            const localStorageSettings = getLocalStorage();

            switch (inputString) {
                case "fakelist":
                    localStorageSettings["fl-recipient-players-Players"] = "";
                    localStorageSettings["fl-recipient-tribes-Tribes"] = "";
                    localStorageSettings["fl-ally-players-Players"] = "";
                    localStorageSettings["fl-ally-tribes-Tribes"] = "";
                    localStorageSettings["fl-enemy-players-Players"] = "";
                    localStorageSettings["fl-enemy-tribes-Tribes"] = "";
                    localStorageSettings["fl-min-distance"] = DEFAULT_MIN_DISTANCE;
                    localStorageSettings["fl-max-distance"] = DEFAULT_MAX_DISTANCE;
                    localStorageSettings["fl-min-points"] = DEFAULT_MIN_VILLAGE_POINTS;
                    localStorageSettings["fl-max-points"] = DEFAULT_MAX_VILLAGE_POINTS;
                    localStorageSettings["fl-fakes-per-player"] = DEFAULT_FAKES_PER_PLAYER;
                    localStorageSettings["fl-filter-villages"] = false;
                    localStorageSettings["fl-image"] = false;
                    localStorageSettings["fl-display-targets"] = false;
                    localStorageSettings["fl-raw-coordinates"] = false;
                    localStorageSettings["fl-with-counts"] = false;
                    localStorageSettings["fl-ally-village-radius"] = DEFAULT_RADIUS;
                    localStorageSettings["fl-number-ally-villages-radius"] = DEFAULT_NUMBER_IN_RADIUS;
                    break;
                case "playerlist":
                    // Reset other values specific to playerlist
                    localStorageSettings["pl-players-Players"] = "";
                    localStorageSettings["pl-tribes-Tribes"] = "";
                    localStorageSettings["pl-excluded-players-Players"] = "";
                    localStorageSettings["pl-min-points"] = DEFAULT_MIN_PLAYER_POINTS;
                    localStorageSettings["pl-max-points"] = DEFAULT_MAX_PLAYER_POINTS;
                    localStorageSettings["pl-min-villages"] = DEFAULT_MIN_VILLAGES;
                    localStorageSettings["pl-max-villages"] = DEFAULT_MAX_VILLAGES;
                    localStorageSettings["pl-separator"] = DEFAULT_SEPARATOR;
                    break;
                case "villagelist":
                    // Reset other values specific to villagelist
                    localStorageSettings["vl-players-Players"] = "";
                    localStorageSettings["vl-tribes-Tribes"] = "";
                    localStorageSettings["vl-min-x-coordinate"] = DEFAULT_MIN_X;
                    localStorageSettings["vl-max-x-coordinate"] = DEFAULT_MAX_X;
                    localStorageSettings["vl-min-y-coordinate"] = DEFAULT_MIN_Y;
                    localStorageSettings["vl-max-y-coordinate"] = DEFAULT_MAX_Y;
                    localStorageSettings["vl-min-points"] = DEFAULT_MIN_VILLAGE_POINTS;
                    localStorageSettings["vl-max-points"] = DEFAULT_MAX_VILLAGE_POINTS;
                    localStorageSettings["vl-raw-coordinates"] = false;
                    localStorageSettings["vl-image"] = false;
                    break;
                case "frontline":
                    // Reset other values specific to frontline
                    localStorageSettings["f-ally-players-Players"] = "";
                    localStorageSettings["f-ally-tribes-Tribes"] = "";
                    localStorageSettings["f-enemy-players-Players"] = "";
                    localStorageSettings["f-enemy-tribes-Tribes"] = "";
                    localStorageSettings["f-min-distance"] = DEFAULT_MIN_DISTANCE;
                    localStorageSettings["f-max-distance"] = DEFAULT_MAX_DISTANCE;
                    localStorageSettings["f-min-points"] = DEFAULT_MIN_VILLAGE_POINTS;
                    localStorageSettings["f-max-points"] = DEFAULT_MAX_VILLAGE_POINTS;
                    localStorageSettings["f-filter-villages"] = false;
                    localStorageSettings["f-image"] = false;
                    localStorageSettings["f-raw-coordinates"] = false;
                    localStorageSettings["f-ally-village-radius"] = DEFAULT_RADIUS;
                    localStorageSettings["f-number-ally-villages-radius"] = DEFAULT_NUMBER_IN_RADIUS;
                    break;
                default:
                    console.error(`${scriptInfo}: Unknown inputString: ${inputString}`);
                    return;
            }

            saveLocalStorage(localStorageSettings);
            initializeInputFields();
        }

        // Service: Function to get settings from localStorage
        function getLocalStorage() {
            const localStorageSettings = localStorage.getItem('sbCoordinateListGenerator');

            if (localStorageSettings) {
                // If settings exist in localStorage, parse and return the object
                return JSON.parse(localStorageSettings);
            } else {
                const defaultSettings = {
                    // Menu Selection
                    "selection-menu": "fakelist",
                    // Player List
                    "pl-players-Players": "",
                    "pl-tribes-Tribes": "",
                    "pl-excluded-players-Players": "",
                    "pl-min-points": DEFAULT_MIN_PLAYER_POINTS,
                    "pl-max-points": DEFAULT_MAX_PLAYER_POINTS,
                    "pl-min-villages": DEFAULT_MIN_VILLAGES,
                    "pl-max-villages": DEFAULT_MAX_VILLAGES,
                    "pl-separator": DEFAULT_SEPARATOR,

                    // Village List
                    "vl-players-Players": "",
                    "vl-tribes-Tribes": "",
                    "vl-min-x-coordinate": DEFAULT_MIN_X,
                    "vl-max-x-coordinate": DEFAULT_MAX_X,
                    "vl-min-y-coordinate": DEFAULT_MIN_Y,
                    "vl-max-y-coordinate": DEFAULT_MAX_Y,
                    "vl-min-points": DEFAULT_MIN_VILLAGE_POINTS,
                    "vl-max-points": DEFAULT_MAX_VILLAGE_POINTS,
                    "vl-image": false,
                    "vl-raw-coordinates": false,

                    // Fakelist
                    "fl-recipient-players-Players": "",
                    "fl-recipient-tribes-Tribes": "",
                    "fl-ally-players-Players": "",
                    "fl-ally-tribes-Tribes": "",
                    "fl-enemy-players-Players": "",
                    "fl-enemy-tribes-Tribes": "",
                    "fl-min-distance": DEFAULT_MIN_DISTANCE,
                    "fl-max-distance": DEFAULT_MAX_DISTANCE,
                    "fl-min-points": DEFAULT_MIN_VILLAGE_POINTS,
                    "fl-max-points": DEFAULT_MAX_VILLAGE_POINTS,
                    "fl-fakes-per-player": DEFAULT_FAKES_PER_PLAYER,
                    "fl-filter-villages": false,
                    "fl-image": false,
                    "fl-display-targets": false,
                    "fl-raw-coordinates": false,
                    "fl-with-counts": false,
                    "fl-ally-village-radius": DEFAULT_RADIUS,
                    "fl-number-ally-villages-radius": DEFAULT_NUMBER_IN_RADIUS,

                    // Frontline
                    "f-ally-players-Players": "",
                    "f-ally-tribes-Tribes": "",
                    "f-enemy-players-Players": "",
                    "f-enemy-tribes-Tribes": "",
                    "f-min-distance": DEFAULT_MIN_DISTANCE,
                    "f-max-distance": DEFAULT_MAX_DISTANCE,
                    "f-min-points": DEFAULT_MIN_VILLAGE_POINTS,
                    "f-max-points": DEFAULT_MAX_VILLAGE_POINTS,
                    "f-filter-villages": false,
                    "f-image": false,
                    "f-raw-coordinates": false,
                    "f-ally-village-radius": DEFAULT_RADIUS,
                    "f-number-ally-villages-radius": DEFAULT_NUMBER_IN_RADIUS,
                };

                saveLocalStorage(defaultSettings);

                return defaultSettings;
            }
        }

        //Service: Function to save settings to localStorage
        function saveLocalStorage(settingsObject) {
            // Stringify and save the settings object
            localStorage.setItem('sbCoordinateListGenerator', JSON.stringify(settingsObject));
        }

        // Service: Fetch world config and needed data
        async function fetchWorldConfigData() {
            try {
                const villages = await twSDK.worldDataAPI('village');
                const players = await twSDK.worldDataAPI('player');
                const tribes = await twSDK.worldDataAPI('ally');
                return { tribes, players, villages };
            } catch (error) {
                UI.ErrorMessage(
                    twSDK.tt('There was an error while fetching the data!')
                );
                console.error(`${scriptInfo} Error:`, error);
            }
        }
    }
);