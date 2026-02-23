/*
* Script Name: Coordinate List Generator
* Version: v1.2.2
* Last Updated: 2026-02-23
* Author: SaveBank
* Author Contact: Discord: savebank
* Contributor: RedAlert 
* Approved: Yes
* Approved Date: 2024-02-17
* Mod: RedAlert
*/

/*
    NAME: Tribal Wars Scripts Library
    VERSION: 1.1.8 (beta version)
    LAST UPDATED AT: 2024-05-15
    AUTHOR: RedAlert (redalert_tw)
    AUTHOR URL: https://twscripts.dev/
    CONTRIBUTORS: Shinko to Kuma; Sass, SaveBankDev, DSsecundum, suilenroc
    HELP: https://github.com/RedAlertTW/Tribal-Wars-Scripts-SDK
    STATUS: Work in progress. Not finished 100%.

    This software is provided 'as-is', without any express or implied warranty.
    In no event will the author/s be held liable for any damages arising from the use of this software.
    It is allowed to clone, rehost, re-distribute and all other forms of copying this code without permission from the author/s, for as long as it is not used on commercial products.
    This notice may not be removed or altered from any source distribution.
 */

scriptUrl = document.currentScript.src;

window.twSDK = {
    // variables
    scriptData: {},
    translations: {},
    allowedMarkets: [],
    allowedScreens: [],
    allowedModes: [],
    enableCountApi: true,
    isDebug: false,
    isMobile: jQuery('#mobileHeader').length > 0,
    delayBetweenRequests: 200,
    // helper variables
    market: game_data.market,
    units: game_data.units,
    village: game_data.village,
    buildings: game_data.village.buildings,
    sitterId: game_data.player.sitter > 0 ? `&t=${game_data.player.id}` : '',
    coordsRegex: /\d{1,3}\|\d{1,3}/g,
    dateTimeMatch:
        /(?:[A-Z][a-z]{2}\s+\d{1,2},\s*\d{0,4}\s+|today\s+at\s+|tomorrow\s+at\s+)\d{1,2}:\d{2}:\d{2}:?\.?\d{0,3}/,
    worldInfoInterface: '/interface.php?func=get_config',
    unitInfoInterface: '/interface.php?func=get_unit_info',
    buildingInfoInterface: '/interface.php?func=get_building_info',
    worldDataVillages: '/map/village.txt',
    worldDataPlayers: '/map/player.txt',
    worldDataTribes: '/map/ally.txt',
    worldDataConquests: '/map/conquer_extended.txt',
    // game constants
    // https://help.tribalwars.net/wiki/Points
    buildingPoints: {
        main: [
            10, 2, 2, 3, 4, 4, 5, 6, 7, 9, 10, 12, 15, 18, 21, 26, 31, 37, 44,
            53, 64, 77, 92, 110, 133, 159, 191, 229, 274, 330,
        ],
        barracks: [
            16, 3, 4, 5, 5, 7, 8, 9, 12, 14, 16, 20, 24, 28, 34, 42, 49, 59, 71,
            85, 102, 123, 147, 177, 212,
        ],
        stable: [
            20, 4, 5, 6, 6, 9, 10, 12, 14, 17, 21, 25, 29, 36, 43, 51, 62, 74,
            88, 107,
        ],
        garage: [24, 5, 6, 6, 9, 10, 12, 14, 17, 21, 25, 29, 36, 43, 51],
        chuch: [10, 2, 2],
        church_f: [10],
        watchtower: [
            42, 8, 10, 13, 14, 18, 20, 25, 31, 36, 43, 52, 62, 75, 90, 108, 130,
            155, 186, 224,
        ],
        snob: [512],
        smith: [
            19, 4, 4, 6, 6, 8, 10, 11, 14, 16, 20, 23, 28, 34, 41, 49, 58, 71,
            84, 101,
        ],
        place: [0],
        statue: [24],
        market: [
            10, 2, 2, 3, 4, 4, 5, 6, 7, 9, 10, 12, 15, 18, 21, 26, 31, 37, 44,
            53, 64, 77, 92, 110, 133,
        ],
        wood: [
            6, 1, 2, 1, 2, 3, 3, 3, 5, 5, 6, 8, 8, 11, 13, 15, 19, 22, 27, 32,
            38, 46, 55, 66, 80, 95, 115, 137, 165, 198,
        ],
        stone: [
            6, 1, 2, 1, 2, 3, 3, 3, 5, 5, 6, 8, 8, 11, 13, 15, 19, 22, 27, 32,
            38, 46, 55, 66, 80, 95, 115, 137, 165, 198,
        ],
        iron: [
            6, 1, 2, 1, 2, 3, 3, 3, 5, 5, 6, 8, 8, 11, 13, 15, 19, 22, 27, 32,
            38, 46, 55, 66, 80, 95, 115, 137, 165, 198,
        ],
        farm: [
            5, 1, 1, 2, 1, 2, 3, 3, 3, 5, 5, 6, 8, 8, 11, 13, 15, 19, 22, 27,
            32, 38, 46, 55, 66, 80, 95, 115, 137, 165,
        ],
        storage: [
            6, 1, 2, 1, 2, 3, 3, 3, 5, 5, 6, 8, 8, 11, 13, 15, 19, 22, 27, 32,
            38, 46, 55, 66, 80, 95, 115, 137, 165, 198,
        ],
        hide: [5, 1, 1, 2, 1, 2, 3, 3, 3, 5],
        wall: [
            8, 2, 2, 2, 3, 3, 4, 5, 5, 7, 9, 9, 12, 15, 17, 20, 25, 29, 36, 43,
        ],
    },
    unitsFarmSpace: {
        spear: 1,
        sword: 1,
        axe: 1,
        archer: 1,
        spy: 2,
        light: 4,
        marcher: 5,
        heavy: 6,
        ram: 5,
        catapult: 8,
        knight: 10,
        snob: 100,
    },
    // https://help.tribalwars.net/wiki/Timber_camp
    // https://help.tribalwars.net/wiki/Clay_pit
    // https://help.tribalwars.net/wiki/Iron_mine
    resPerHour: {
        0: 2,
        1: 30,
        2: 35,
        3: 41,
        4: 47,
        5: 55,
        6: 64,
        7: 74,
        8: 86,
        9: 100,
        10: 117,
        11: 136,
        12: 158,
        13: 184,
        14: 214,
        15: 249,
        16: 289,
        17: 337,
        18: 391,
        19: 455,
        20: 530,
        21: 616,
        22: 717,
        23: 833,
        24: 969,
        25: 1127,
        26: 1311,
        27: 1525,
        28: 1774,
        29: 2063,
        30: 2400,
    },
    watchtowerLevels: [
        1.1, 1.3, 1.5, 1.7, 2, 2.3, 2.6, 3, 3.4, 3.9, 4.4, 5.1, 5.8, 6.7, 7.6,
        8.7, 10, 11.5, 13.1, 15,
    ],

    // internal methods
    _initDebug: function () {
        const scriptInfo = this.scriptInfo();
        console.debug(`${scriptInfo} It works 🚀!`);
        console.debug(`${scriptInfo} HELP:`, this.scriptData.helpLink);
        if (this.isDebug) {
            console.debug(`${scriptInfo} Market:`, game_data.market);
            console.debug(`${scriptInfo} World:`, game_data.world);
            console.debug(`${scriptInfo} Screen:`, game_data.screen);
            console.debug(
                `${scriptInfo} Game Version:`,
                game_data.majorVersion
            );
            console.debug(`${scriptInfo} Game Build:`, game_data.version);
            console.debug(`${scriptInfo} Locale:`, game_data.locale);
            console.debug(
                `${scriptInfo} PA:`,
                game_data.features.Premium.active
            );
            console.debug(
                `${scriptInfo} LA:`,
                game_data.features.FarmAssistent.active
            );
            console.debug(
                `${scriptInfo} AM:`,
                game_data.features.AccountManager.active
            );
        }
    },

    // public methods
    addGlobalStyle: function () {
        return `
            /* Table Styling */
            .ra-table-container { overflow-y: auto; overflow-x: hidden; height: auto; max-height: 400px; }
            .ra-table th { font-size: 14px; }
            .ra-table th label { margin: 0; padding: 0; }
            .ra-table th,
            .ra-table td { padding: 5px; text-align: center; }
            .ra-table td a { word-break: break-all; }
            .ra-table a:focus { color: blue; }
            .ra-table a.btn:focus { color: #fff; }
            .ra-table tr:nth-of-type(2n) td { background-color: #f0e2be }
            .ra-table tr:nth-of-type(2n+1) td { background-color: #fff5da; }

            .ra-table-v2 th,
            .ra-table-v2 td { text-align: left; }

            .ra-table-v3 { border: 2px solid #bd9c5a; }
            .ra-table-v3 th,
            .ra-table-v3 td { border-collapse: separate; border: 1px solid #bd9c5a; text-align: left; }

            /* Inputs */
            .ra-textarea { width: 100%; height: 80px; resize: none; }

            /* Popup */
            .ra-popup-content { width: 360px; }
            .ra-popup-content * { box-sizing: border-box; }
            .ra-popup-content input[type="text"] { padding: 3px; width: 100%; }
            .ra-popup-content .btn-confirm-yes { padding: 3px !important; }
            .ra-popup-content label { display: block; margin-bottom: 5px; font-weight: 600; }
            .ra-popup-content > div { margin-bottom: 15px; }
            .ra-popup-content > div:last-child { margin-bottom: 0 !important; }
            .ra-popup-content textarea { width: 100%; height: 100px; resize: none; }

            /* Elements */
            .ra-details { display: block; margin-bottom: 8px; border: 1px solid #603000; padding: 8px; border-radius: 4px; }
            .ra-details summary { font-weight: 600; cursor: pointer; }
            .ra-details p { margin: 10px 0 0 0; padding: 0; }

            /* Helpers */
            .ra-pa5 { padding: 5px !important; }
            .ra-mt15 { margin-top: 15px !important; }
            .ra-mb10 { margin-bottom: 10px !important; }
            .ra-mb15 { margin-bottom: 15px !important; }
            .ra-tal { text-align: left !important; }
            .ra-tac { text-align: center !important; }
            .ra-tar { text-align: right !important; }

            /* RESPONSIVE */
            @media (max-width: 480px) {
                .ra-fixed-widget {
                    position: relative !important;
                    top: 0;
                    left: 0;
                    display: block;
                    width: auto;
                    height: auto;
                    z-index: 1;
                }

                .ra-box-widget {
                    position: relative;
                    display: block;
                    box-sizing: border-box;
                    width: 97%;
                    height: auto;
                    margin: 10px auto;
                }

                .ra-table {
                    border-collapse: collapse !important;
                }

                .custom-close-button { display: none; }
                .ra-fixed-widget h3 { margin-bottom: 15px; }
                .ra-popup-content { width: 100%; }
            }
        `;
    },
    arraysIntersection: function () {
        var result = [];
        var lists;

        if (arguments.length === 1) {
            lists = arguments[0];
        } else {
            lists = arguments;
        }

        for (var i = 0; i < lists.length; i++) {
            var currentList = lists[i];
            for (var y = 0; y < currentList.length; y++) {
                var currentValue = currentList[y];
                if (result.indexOf(currentValue) === -1) {
                    var existsInAll = true;
                    for (var x = 0; x < lists.length; x++) {
                        if (lists[x].indexOf(currentValue) === -1) {
                            existsInAll = false;
                            break;
                        }
                    }
                    if (existsInAll) {
                        result.push(currentValue);
                    }
                }
            }
        }
        return result;
    },
    buildUnitsPicker: function (
        selectedUnits = [],
        unitsToIgnore,
        type = 'checkbox'
    ) {
        let unitsTable = ``;

        let thUnits = ``;
        let tableRow = ``;

        game_data.units.forEach((unit) => {
            if (!unitsToIgnore.includes(unit)) {
                let checked = '';
                if (selectedUnits.includes(unit)) {
                    checked = `checked`;
                }

                thUnits += `
                    <th class="ra-tac">
                        <label for="unit_${unit}">
                            <img src="/graphic/unit/unit_${unit}.png">
                        </label>
                    </th>
                `;

                tableRow += `
                    <td class="ra-tac">
                        <input name="ra_chosen_units" type="${type}" ${checked} id="unit_${unit}" class="ra-unit-selector" value="${unit}" />
                    </td>
                `;
            }
        });

        unitsTable = `
            <table class="ra-table ra-table-v2" width="100%" id="raUnitSelector">
                <thead>
                    <tr>
                        ${thUnits}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        ${tableRow}
                    </tr>
                </tbody>
            </table>
        `;

        return unitsTable;
    },
    calculateCoinsNeededForNthNoble: function (noble) {
        return (noble * noble + noble) / 2;
    },
    calculateDistanceFromCurrentVillage: function (coord) {
        const x1 = game_data.village.x;
        const y1 = game_data.village.y;
        const [x2, y2] = coord.split('|');
        const deltaX = Math.abs(x1 - x2);
        const deltaY = Math.abs(y1 - y2);
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    },
    calculateDistance: function (from, to) {
        const [x1, y1] = from.split('|');
        const [x2, y2] = to.split('|');
        const deltaX = Math.abs(x1 - x2);
        const deltaY = Math.abs(y1 - y2);
        return Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    },
    calculatePercentages: function (amount, total) {
        if (amount === undefined) amount = 0;
        return parseFloat((amount / total) * 100).toFixed(2);
    },
    calculateTimesByDistance: async function (distance) {
        const _self = this;

        const times = [];
        const travelTimes = [];

        const unitInfo = await _self.getWorldUnitInfo();
        const worldConfig = await _self.getWorldConfig();

        for (let [key, value] of Object.entries(unitInfo.config)) {
            times.push(value.speed);
        }

        const { speed, unit_speed } = worldConfig.config;

        times.forEach((time) => {
            let travelTime = Math.round(
                (distance * time * 60) / speed / unit_speed
            );
            travelTime = _self.secondsToHms(travelTime);
            travelTimes.push(travelTime);
        });

        return travelTimes;
    },
    checkValidLocation: function (type) {
        switch (type) {
            case 'screen':
                return this.allowedScreens.includes(
                    this.getParameterByName('screen')
                );
            case 'mode':
                return this.allowedModes.includes(
                    this.getParameterByName('mode')
                );
            default:
                return false;
        }
    },
    checkValidMarket: function () {
        if (this.market === 'yy') return true;
        return this.allowedMarkets.includes(this.market);
    },
    cleanString: function (string) {
        try {
            return decodeURIComponent(string).replace(/\+/g, ' ');
        } catch (error) {
            console.error(error, string);
            return string;
        }
    },
    copyToClipboard: function (string) {
        navigator.clipboard.writeText(string);
    },
    createUUID: function () {
        return crypto.randomUUID();
    },
    csvToArray: function (strData, strDelimiter = ',') {
        var objPattern = new RegExp(
            '(\\' +
                strDelimiter +
                '|\\r?\\n|\\r|^)' +
                '(?:"([^"]*(?:""[^"]*)*)"|' +
                '([^"\\' +
                strDelimiter +
                '\\r\\n]*))',
            'gi'
        );
        var arrData = [[]];
        var arrMatches = null;
        while ((arrMatches = objPattern.exec(strData))) {
            var strMatchedDelimiter = arrMatches[1];
            if (
                strMatchedDelimiter.length &&
                strMatchedDelimiter !== strDelimiter
            ) {
                arrData.push([]);
            }
            var strMatchedValue;

            if (arrMatches[2]) {
                strMatchedValue = arrMatches[2].replace(
                    new RegExp('""', 'g'),
                    '"'
                );
            } else {
                strMatchedValue = arrMatches[3];
            }
            arrData[arrData.length - 1].push(strMatchedValue);
        }
        return arrData;
    },
    decryptString: function (str) {
        const alphabet =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
        let decryptedStr = '';

        for (let i = 0; i < str.length; i++) {
            const char = str[i];
            const index = alphabet.indexOf(char);

            if (index === -1) {
                // Character is not in the alphabet, leave it as-is
                decryptedStr += char;
            } else {
                // Substitue the character with its corresponding shifted character
                const shiftedIndex = (index - 3 + 94) % 94;
                decryptedStr += alphabet[shiftedIndex];
            }
        }

        return decryptedStr;
    },
    encryptString: function (str) {
        const alphabet =
            'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789 !"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~';
        let encryptedStr = '';

        for (let i = 0; i < str.length; i++) {
            const char = str[i];
            const index = alphabet.indexOf(char);

            if (index === -1) {
                // Character is not in the alphabet, leave it as-is
                encryptedStr += char;
            } else {
                // Substitue the character with its corresponding shifted character
                const shiftedIndex = (index + 3) % 94;
                encryptedStr += alphabet[shiftedIndex];
            }
        }

        return encryptedStr;
    },
    filterVillagesByPlayerIds: function (playerIds, villages) {
        const playerVillages = [];
        villages.forEach((village) => {
            if (playerIds.includes(parseInt(village[4]))) {
                const coordinate = village[2] + '|' + village[3];
                playerVillages.push(coordinate);
            }
        });
        return playerVillages;
    },
    formatAsNumber: function (number) {
        return parseInt(number).toLocaleString('de');
    },
    formatDateTime: function (dateTime) {
        dateTime = new Date(dateTime);
        return (
            this.zeroPad(dateTime.getDate(), 2) +
            '/' +
            this.zeroPad(dateTime.getMonth() + 1, 2) +
            '/' +
            dateTime.getFullYear() +
            ' ' +
            this.zeroPad(dateTime.getHours(), 2) +
            ':' +
            this.zeroPad(dateTime.getMinutes(), 2) +
            ':' +
            this.zeroPad(dateTime.getSeconds(), 2)
        );
    },
    frequencyCounter: function (array) {
        return array.reduce(function (acc, curr) {
            if (typeof acc[curr] == 'undefined') {
                acc[curr] = 1;
            } else {
                acc[curr] += 1;
            }
            return acc;
        }, {});
    },
    getAll: function (
        urls, // array of URLs
        onLoad, // called when any URL is loaded, params (index, data)
        onDone, // called when all URLs successfully loaded, no params
        onError // called when a URL load fails or if onLoad throws an exception, params (error)
    ) {
        var numDone = 0;
        var lastRequestTime = 0;
        var minWaitTime = this.delayBetweenRequests; // ms between requests
        loadNext();
        function loadNext() {
            if (numDone == urls.length) {
                onDone();
                return;
            }

            let now = Date.now();
            let timeElapsed = now - lastRequestTime;
            if (timeElapsed < minWaitTime) {
                let timeRemaining = minWaitTime - timeElapsed;
                setTimeout(loadNext, timeRemaining);
                return;
            }
            lastRequestTime = now;
            jQuery
                .get(urls[numDone])
                .done((data) => {
                    try {
                        onLoad(numDone, data);
                        ++numDone;
                        loadNext();
                    } catch (e) {
                        onError(e);
                    }
                })
                .fail((xhr) => {
                    onError(xhr);
                });
        }
    },
    getBuildingsInfo: async function () {
        const TIME_INTERVAL = 60 * 60 * 1000 * 24 * 365; // fetch config only once since they don't change
        const LAST_UPDATED_TIME =
            localStorage.getItem('buildings_info_last_updated') ?? 0;
        let buildingsInfo = [];

        if (LAST_UPDATED_TIME !== null) {
            if (Date.parse(new Date()) >= LAST_UPDATED_TIME + TIME_INTERVAL) {
                const response = await jQuery.ajax({
                    url: this.buildingInfoInterface,
                });
                buildingsInfo = this.xml2json(jQuery(response));
                localStorage.setItem(
                    'buildings_info',
                    JSON.stringify(buildingsInfo)
                );
                localStorage.setItem(
                    'buildings_info_last_updated',
                    Date.parse(new Date())
                );
            } else {
                buildingsInfo = JSON.parse(
                    localStorage.getItem('buildings_info')
                );
            }
        } else {
            const response = await jQuery.ajax({
                url: this.buildingInfoInterface,
            });
            buildingsInfo = this.xml2json(jQuery(response));
            localStorage.setItem('buildings_info', JSON.stringify(unitInfo));
            localStorage.setItem(
                'buildings_info_last_updated',
                Date.parse(new Date())
            );
        }

        return buildingsInfo;
    },
    getContinentByCoord: function (coord) {
        let [x, y] = Array.from(coord.split('|')).map((e) => parseInt(e));
        for (let i = 0; i < 1000; i += 100) {
            //x axes
            for (let j = 0; j < 1000; j += 100) {
                //y axes
                if (i >= x && x < i + 100 && j >= y && y < j + 100) {
                    let nr_continent =
                        parseInt(y / 100) + '' + parseInt(x / 100);
                    return nr_continent;
                }
            }
        }
    },
    getContinentsFromCoordinates: function (coordinates) {
        let continents = [];

        coordinates.forEach((coord) => {
            const continent = twSDK.getContinentByCoord(coord);
            continents.push(continent);
        });

        return [...new Set(continents)];
    },
    getCoordFromString: function (string) {
        if (!string) return [];
        return string.match(this.coordsRegex)[0];
    },
    getDestinationCoordinates: function (config, tribes, players, villages) {
        const {
            playersInput,
            tribesInput,
            continents,
            minCoord,
            maxCoord,
            distCenter,
            center,
            excludedPlayers,
            enable20To1Limit,
            minPoints,
            maxPoints,
            selectiveRandomConfig,
        } = config;

        // get target coordinates
        const chosenPlayers = playersInput.split(',');
        const chosenTribes = tribesInput.split(',');

        const chosenPlayerIds = twSDK.getEntityIdsByArrayIndex(
            chosenPlayers,
            players,
            1
        );
        const chosenTribeIds = twSDK.getEntityIdsByArrayIndex(
            chosenTribes,
            tribes,
            2
        );

        const tribePlayers = twSDK.getTribeMembersById(chosenTribeIds, players);

        const mergedPlayersList = [...tribePlayers, ...chosenPlayerIds];
        let uniquePlayersList = [...new Set(mergedPlayersList)];

        const chosenExcludedPlayers = excludedPlayers.split(',');
        if (chosenExcludedPlayers.length > 0) {
            const excludedPlayersIds = twSDK.getEntityIdsByArrayIndex(
                chosenExcludedPlayers,
                players,
                1
            );
            excludedPlayersIds.forEach((item) => {
                uniquePlayersList = uniquePlayersList.filter(
                    (player) => player !== item
                );
            });
        }

        // filter by 20:1 rule
        if (enable20To1Limit) {
            let uniquePlayersListArray = [];
            uniquePlayersList.forEach((playerId) => {
                players.forEach((player) => {
                    if (parseInt(player[0]) === playerId) {
                        uniquePlayersListArray.push(player);
                    }
                });
            });

            const playersNotBiggerThen20Times = uniquePlayersListArray.filter(
                (player) => {
                    return (
                        parseInt(player[4]) <=
                        parseInt(game_data.player.points) * 20
                    );
                }
            );

            uniquePlayersList = playersNotBiggerThen20Times.map((player) =>
                parseInt(player[0])
            );
        }

        let coordinatesArray = twSDK.filterVillagesByPlayerIds(
            uniquePlayersList,
            villages
        );

        // filter by min and max village points
        if (minPoints || maxPoints) {
            let filteredCoordinatesArray = [];

            coordinatesArray.forEach((coordinate) => {
                villages.forEach((village) => {
                    const villageCoordinate = village[2] + '|' + village[3];
                    if (villageCoordinate === coordinate) {
                        filteredCoordinatesArray.push(village);
                    }
                });
            });

            filteredCoordinatesArray = filteredCoordinatesArray.filter(
                (village) => {
                    const villagePoints = parseInt(village[5]);
                    const minPointsNumber = parseInt(minPoints) || 26;
                    const maxPointsNumber = parseInt(maxPoints) || 12124;
                    if (
                        villagePoints > minPointsNumber &&
                        villagePoints < maxPointsNumber
                    ) {
                        return village;
                    }
                }
            );

            coordinatesArray = filteredCoordinatesArray.map(
                (village) => village[2] + '|' + village[3]
            );
        }

        // filter coordinates by continent
        if (continents.length) {
            let chosenContinentsArray = continents.split(',');
            chosenContinentsArray = chosenContinentsArray.map((item) =>
                item.trim()
            );

            const availableContinents =
                twSDK.getContinentsFromCoordinates(coordinatesArray);
            const filteredVillagesByContinent =
                twSDK.getFilteredVillagesByContinent(
                    coordinatesArray,
                    availableContinents
                );

            const isUserInputValid = chosenContinentsArray.every((item) =>
                availableContinents.includes(item)
            );

            if (isUserInputValid) {
                coordinatesArray = chosenContinentsArray
                    .map((continent) => {
                        if (continent.length && $.isNumeric(continent)) {
                            return [...filteredVillagesByContinent[continent]];
                        } else {
                            return;
                        }
                    })
                    .flat();
            } else {
                return [];
            }
        }

        // filter coordinates by a bounding box of coordinates
        if (minCoord.length && maxCoord.length) {
            const raMinCoordCheck = minCoord.match(twSDK.coordsRegex);
            const raMaxCoordCheck = maxCoord.match(twSDK.coordsRegex);

            if (raMinCoordCheck !== null && raMaxCoordCheck !== null) {
                const [minX, minY] = raMinCoordCheck[0].split('|');
                const [maxX, maxY] = raMaxCoordCheck[0].split('|');

                coordinatesArray = [...coordinatesArray].filter(
                    (coordinate) => {
                        const [x, y] = coordinate.split('|');
                        if (minX <= x && x <= maxX && minY <= y && y <= maxY) {
                            return coordinate;
                        }
                    }
                );
            } else {
                return [];
            }
        }

        // filter by radius
        if (distCenter.length && center.length) {
            if (!$.isNumeric(distCenter)) distCenter = 0;
            const raCenterCheck = center.match(twSDK.coordsRegex);

            if (distCenter !== 0 && raCenterCheck !== null) {
                let coordinatesArrayWithDistance = [];
                coordinatesArray.forEach((coordinate) => {
                    const distance = twSDK.calculateDistance(
                        raCenterCheck[0],
                        coordinate
                    );
                    coordinatesArrayWithDistance.push({
                        coord: coordinate,
                        distance: distance,
                    });
                });

                coordinatesArrayWithDistance =
                    coordinatesArrayWithDistance.filter((item) => {
                        return (
                            parseFloat(item.distance) <= parseFloat(distCenter)
                        );
                    });

                coordinatesArray = coordinatesArrayWithDistance.map(
                    (item) => item.coord
                );
            } else {
                return [];
            }
        }

        // apply multiplier
        if (selectiveRandomConfig) {
            const selectiveRandomizer = selectiveRandomConfig.split(';');

            const makeRepeated = (arr, repeats) =>
                Array.from({ length: repeats }, () => arr).flat();
            const multipliedCoordinatesArray = [];

            selectiveRandomizer.forEach((item) => {
                const [playerName, distribution] = item.split(':');
                if (distribution > 1) {
                    players.forEach((player) => {
                        if (
                            twSDK.cleanString(player[1]) ===
                            twSDK.cleanString(playerName)
                        ) {
                            let playerVillages =
                                twSDK.filterVillagesByPlayerIds(
                                    [parseInt(player[0])],
                                    villages
                                );
                            const flattenedPlayerVillagesArray = makeRepeated(
                                playerVillages,
                                distribution
                            );
                            multipliedCoordinatesArray.push(
                                flattenedPlayerVillagesArray
                            );
                        }
                    });
                }
            });

            coordinatesArray.push(...multipliedCoordinatesArray.flat());
        }

        return coordinatesArray;
    },
    getEntityIdsByArrayIndex: function (chosenItems, items, index) {
        const itemIds = [];
        chosenItems.forEach((chosenItem) => {
            items.forEach((item) => {
                if (
                    twSDK.cleanString(item[index]) ===
                    twSDK.cleanString(chosenItem)
                ) {
                    return itemIds.push(parseInt(item[0]));
                }
            });
        });
        return itemIds;
    },
    getFilteredVillagesByContinent: function (
        playerVillagesCoords,
        continents
    ) {
        let coords = [...playerVillagesCoords];
        let filteredVillagesByContinent = [];

        coords.forEach((coord) => {
            continents.forEach((continent) => {
                let currentVillageContinent = twSDK.getContinentByCoord(coord);
                if (currentVillageContinent === continent) {
                    filteredVillagesByContinent.push({
                        continent: continent,
                        coords: coord,
                    });
                }
            });
        });

        return twSDK.groupArrayByProperty(
            filteredVillagesByContinent,
            'continent',
            'coords'
        );
    },
    getGameFeatures: function () {
        const { Premium, FarmAssistent, AccountManager } = game_data.features;
        const isPA = Premium.active;
        const isLA = FarmAssistent.active;
        const isAM = AccountManager.active;
        return { isPA, isLA, isAM };
    },
    getKeyByValue: function (object, value) {
        return Object.keys(object).find((key) => object[key] === value);
    },
    getLandingTimeFromArrivesIn: function (arrivesIn) {
        const currentServerTime = twSDK.getServerDateTimeObject();
        const [hours, minutes, seconds] = arrivesIn.split(':');
        const totalSeconds = +hours * 3600 + +minutes * 60 + +seconds;
        const arrivalDateTime = new Date(
            currentServerTime.getTime() + totalSeconds * 1000
        );
        return arrivalDateTime;
    },
    getLastCoordFromString: function (string) {
        if (!string) return [];
        const regex = this.coordsRegex;
        let match;
        let lastMatch;
        while ((match = regex.exec(string)) !== null) {
            lastMatch = match;
        }
        return lastMatch ? lastMatch[0] : [];
    },
    getPagesToFetch: function () {
        let list_pages = [];

        const currentPage = twSDK.getParameterByName('page');
        if (currentPage == '-1') return [];

        if (
            document
                .getElementsByClassName('vis')[1]
                .getElementsByTagName('select').length > 0
        ) {
            Array.from(
                document
                    .getElementsByClassName('vis')[1]
                    .getElementsByTagName('select')[0]
            ).forEach(function (item) {
                list_pages.push(item.value);
            });
            list_pages.pop();
        } else if (
            document.getElementsByClassName('paged-nav-item').length > 0
        ) {
            let nr = 0;
            Array.from(
                document.getElementsByClassName('paged-nav-item')
            ).forEach(function (item) {
                let current = item.href;
                current = current.split('page=')[0] + 'page=' + nr;
                nr++;
                list_pages.push(current);
            });
        } else {
            let current_link = window.location.href;
            list_pages.push(current_link);
        }
        list_pages.shift();

        return list_pages;
    },
    getParameterByName: function (name, url = window.location.href) {
        return new URL(url).searchParams.get(name);
    },
    getRelativeImagePath: function (url) {
        const urlParts = url.split('/');
        return `/${urlParts[5]}/${urlParts[6]}/${urlParts[7]}`;
    },
    getServerDateTimeObject: function () {
        const formattedTime = this.getServerDateTime();
        return new Date(formattedTime);
    },
    getServerDateTime: function () {
        const serverTime = jQuery('#serverTime').text();
        const serverDate = jQuery('#serverDate').text();
        const [day, month, year] = serverDate.split('/');
        const serverTimeFormatted =
            year + '-' + month + '-' + day + ' ' + serverTime;
        return serverTimeFormatted;
    },
    getTimeFromString: function (timeLand) {
        let dateLand = '';
        let serverDate = document
            .getElementById('serverDate')
            .innerText.split('/');

        let TIME_PATTERNS = {
            today: 'today at %s',
            tomorrow: 'tomorrow at %s',
            later: 'on %1 at %2',
        };

        if (window.lang) {
            TIME_PATTERNS = {
                today: window.lang['aea2b0aa9ae1534226518faaefffdaad'],
                tomorrow: window.lang['57d28d1b211fddbb7a499ead5bf23079'],
                later: window.lang['0cb274c906d622fa8ce524bcfbb7552d'],
            };
        }

        let todayPattern = new RegExp(
            TIME_PATTERNS.today.replace('%s', '([\\d+|:]+)')
        ).exec(timeLand);
        let tomorrowPattern = new RegExp(
            TIME_PATTERNS.tomorrow.replace('%s', '([\\d+|:]+)')
        ).exec(timeLand);
        let laterDatePattern = new RegExp(
            TIME_PATTERNS.later
                .replace('%1', '([\\d+|\\.]+)')
                .replace('%2', '([\\d+|:]+)')
        ).exec(timeLand);

        if (todayPattern !== null) {
            // today
            dateLand =
                serverDate[0] +
                '/' +
                serverDate[1] +
                '/' +
                serverDate[2] +
                ' ' +
                timeLand.match(/\d+:\d+:\d+:\d+/)[0];
        } else if (tomorrowPattern !== null) {
            // tomorrow
            let tomorrowDate = new Date(
                serverDate[1] + '/' + serverDate[0] + '/' + serverDate[2]
            );
            tomorrowDate.setDate(tomorrowDate.getDate() + 1);
            dateLand =
                ('0' + tomorrowDate.getDate()).slice(-2) +
                '/' +
                ('0' + (tomorrowDate.getMonth() + 1)).slice(-2) +
                '/' +
                tomorrowDate.getFullYear() +
                ' ' +
                timeLand.match(/\d+:\d+:\d+:\d+/)[0];
        } else {
            // on
            let on = timeLand.match(/\d+.\d+/)[0].split('.');
            dateLand =
                on[0] +
                '/' +
                on[1] +
                '/' +
                serverDate[2] +
                ' ' +
                timeLand.match(/\d+:\d+:\d+:\d+/)[0];
        }

        return dateLand;
    },
    getTravelTimeInSecond: function (distance, unitSpeed) {
        let travelTime = distance * unitSpeed * 60;
        if (travelTime % 1 > 0.5) {
            return (travelTime += 1);
        } else {
            return travelTime;
        }
    },
    getTribeMembersById: function (tribeIds, players) {
        const tribeMemberIds = [];
        players.forEach((player) => {
            if (tribeIds.includes(parseInt(player[2]))) {
                tribeMemberIds.push(parseInt(player[0]));
            }
        });
        return tribeMemberIds;
    },
    getTroop: function (unit) {
        return parseInt(
            document.units[unit].parentNode
                .getElementsByTagName('a')[1]
                .innerHTML.match(/\d+/),
            10
        );
    },
    getVillageBuildings: function () {
        const buildings = game_data.village.buildings;
        const villageBuildings = [];

        for (let [key, value] of Object.entries(buildings)) {
            if (value > 0) {
                villageBuildings.push({
                    building: key,
                    level: value,
                });
            }
        }

        return villageBuildings;
    },
    getWorldConfig: async function () {
        const TIME_INTERVAL = 60 * 60 * 1000 * 24 * 7;
        const LAST_UPDATED_TIME =
            localStorage.getItem('world_config_last_updated') ?? 0;
        let worldConfig = [];

        if (LAST_UPDATED_TIME !== null) {
            if (Date.parse(new Date()) >= LAST_UPDATED_TIME + TIME_INTERVAL) {
                const response = await jQuery.ajax({
                    url: this.worldInfoInterface,
                });
                worldConfig = this.xml2json(jQuery(response));
                localStorage.setItem(
                    'world_config',
                    JSON.stringify(worldConfig)
                );
                localStorage.setItem(
                    'world_config_last_updated',
                    Date.parse(new Date())
                );
            } else {
                worldConfig = JSON.parse(localStorage.getItem('world_config'));
            }
        } else {
            const response = await jQuery.ajax({
                url: this.worldInfoInterface,
            });
            worldConfig = this.xml2json(jQuery(response));
            localStorage.setItem('world_config', JSON.stringify(unitInfo));
            localStorage.setItem(
                'world_config_last_updated',
                Date.parse(new Date())
            );
        }

        return worldConfig;
    },
    getWorldUnitInfo: async function () {
        const TIME_INTERVAL = 60 * 60 * 1000 * 24 * 7;
        const LAST_UPDATED_TIME =
            localStorage.getItem('units_info_last_updated') ?? 0;
        let unitInfo = [];

        if (LAST_UPDATED_TIME !== null) {
            if (Date.parse(new Date()) >= LAST_UPDATED_TIME + TIME_INTERVAL) {
                const response = await jQuery.ajax({
                    url: this.unitInfoInterface,
                });
                unitInfo = this.xml2json(jQuery(response));
                localStorage.setItem('units_info', JSON.stringify(unitInfo));
                localStorage.setItem(
                    'units_info_last_updated',
                    Date.parse(new Date())
                );
            } else {
                unitInfo = JSON.parse(localStorage.getItem('units_info'));
            }
        } else {
            const response = await jQuery.ajax({
                url: this.unitInfoInterface,
            });
            unitInfo = this.xml2json(jQuery(response));
            localStorage.setItem('units_info', JSON.stringify(unitInfo));
            localStorage.setItem(
                'units_info_last_updated',
                Date.parse(new Date())
            );
        }

        return unitInfo;
    },
    groupArrayByProperty: function (array, property, filter) {
        return array.reduce(function (accumulator, object) {
            // get the value of our object(age in our case) to use for group    the array as the array key
            const key = object[property];
            // if the current value is similar to the key(age) don't accumulate the transformed array and leave it empty
            if (!accumulator[key]) {
                accumulator[key] = [];
            }
            // add the value to the array
            accumulator[key].push(object[filter]);
            // return the transformed array
            return accumulator;
            // Also we also set the initial value of reduce() to an empty object
        }, {});
    },
    isArcherWorld: function () {
        return this.units.includes('archer');
    },
    isChurchWorld: function () {
        return 'church' in this.village.buildings;
    },
    isPaladinWorld: function () {
        return this.units.includes('knight');
    },
    isWatchTowerWorld: function () {
        return 'watchtower' in this.village.buildings;
    },
    loadJS: function (url, callback) {
        let scriptTag = document.createElement('script');
        scriptTag.src = url;
        scriptTag.onload = callback;
        scriptTag.onreadystatechange = callback;
        document.body.appendChild(scriptTag);
    },
    redirectTo: function (location) {
        window.location.assign(game_data.link_base_pure + location);
    },
    removeDuplicateObjectsFromArray: function (array, prop) {
        return array.filter((obj, pos, arr) => {
            return arr.map((mapObj) => mapObj[prop]).indexOf(obj[prop]) === pos;
        });
    },
    renderBoxWidget: function (body, id, mainClass, customStyle) {
        const globalStyle = this.addGlobalStyle();

        const content = `
            <div class="${mainClass} ra-box-widget" id="${id}">
                <div class="${mainClass}-header">
                    <h3>${this.tt(this.scriptData.name)}</h3>
                </div>
                <div class="${mainClass}-body">
                    ${body}
                </div>
                <div class="${mainClass}-footer">
                    <small>
                        <strong>
                            ${this.tt(this.scriptData.name)} ${
            this.scriptData.version
        }
                        </strong> -
                        <a href="${
                            this.scriptData.authorUrl
                        }" target="_blank" rel="noreferrer noopener">
                            ${this.scriptData.author}
                        </a> -
                        <a href="${
                            this.scriptData.helpLink
                        }" target="_blank" rel="noreferrer noopener">
                            ${this.tt('Help')}
                        </a>
                    </small>
                </div>
            </div>
            <style>
                .${mainClass} { position: relative; display: block; width: 100%; height: auto; clear: both; margin: 10px 0 15px; border: 1px solid #603000; box-sizing: border-box; background: #f4e4bc; }
                .${mainClass} * { box-sizing: border-box; }
                .${mainClass} > div { padding: 10px; }
                .${mainClass} .btn-confirm-yes { padding: 3px; }
                .${mainClass}-header { display: flex; align-items: center; justify-content: space-between; background-color: #c1a264 !important; background-image: url(/graphic/screen/tableheader_bg3.png); background-repeat: repeat-x; }
                .${mainClass}-header h3 { margin: 0; padding: 0; line-height: 1; }
                .${mainClass}-body p { font-size: 14px; }
                .${mainClass}-body label { display: block; font-weight: 600; margin-bottom: 6px; }
                
                ${globalStyle}

                /* Custom Style */
                ${customStyle}
            </style>
        `;

        if (jQuery(`#${id}`).length < 1) {
            jQuery('#contentContainer').prepend(content);
            jQuery('#mobileContent').prepend(content);
        } else {
            jQuery(`.${mainClass}-body`).html(body);
        }
    },
    renderFixedWidget: function (
        body,
        id,
        mainClass,
        customStyle,
        width,
        customName = this.scriptData.name
    ) {
        const globalStyle = this.addGlobalStyle();

        const content = `
            <div class="${mainClass} ra-fixed-widget" id="${id}">
                <div class="${mainClass}-header">
                    <h3>${this.tt(customName)}</h3>
                </div>
                <div class="${mainClass}-body">
                    ${body}
                </div>
                <div class="${mainClass}-footer">
                    <small>
                        <strong>
                            ${this.tt(customName)} ${this.scriptData.version}
                        </strong> -
                        <a href="${
                            this.scriptData.authorUrl
                        }" target="_blank" rel="noreferrer noopener">
                            ${this.scriptData.author}
                        </a> -
                        <a href="${
                            this.scriptData.helpLink
                        }" target="_blank" rel="noreferrer noopener">
                            ${this.tt('Help')}
                        </a>
                    </small>
                </div>
                <a class="popup_box_close custom-close-button" href="#">&nbsp;</a>
            </div>
            <style>
                .${mainClass} { position: fixed; top: 10vw; right: 10vw; z-index: 99999; border: 2px solid #7d510f; border-radius: 10px; padding: 10px; width: ${
            width ?? '360px'
        }; overflow-y: auto; padding: 10px; background: #e3d5b3 url('/graphic/index/main_bg.jpg') scroll right top repeat; }
                .${mainClass} * { box-sizing: border-box; }

                ${globalStyle}

                /* Custom Style */
                .custom-close-button { right: 0; top: 0; }
                ${customStyle}
            </style>
        `;

        if (jQuery(`#${id}`).length < 1) {
            if (mobiledevice) {
                jQuery('#content_value').prepend(content);
            } else {
                jQuery('#contentContainer').prepend(content);
                jQuery(`#${id}`).draggable({
                    cancel: '.ra-table, input, textarea, button, select, option',
                });

                jQuery(`#${id} .custom-close-button`).on('click', function (e) {
                    e.preventDefault();
                    jQuery(`#${id}`).remove();
                });
            }
        } else {
            jQuery(`.${mainClass}-body`).html(body);
        }
    },
    scriptInfo: function (scriptData = this.scriptData) {
        return `[${scriptData.name} ${scriptData.version}]`;
    },
    secondsToHms: function (timestamp) {
        const hours = Math.floor(timestamp / 60 / 60);
        const minutes = Math.floor(timestamp / 60) - hours * 60;
        const seconds = timestamp % 60;
        return (
            hours.toString().padStart(2, '0') +
            ':' +
            minutes.toString().padStart(2, '0') +
            ':' +
            seconds.toString().padStart(2, '0')
        );
    },
    setUpdateProgress: function (elementToUpdate, valueToSet) {
        jQuery(elementToUpdate).text(valueToSet);
    },
    sortArrayOfObjectsByKey: function (array, key) {
        return array.sort((a, b) => b[key] - a[key]);
    },
    startProgressBar: function (total) {
        const width = jQuery('#content_value')[0].clientWidth;
        const preloaderContent = `
            <div id="progressbar" class="progress-bar" style="margin-bottom:12px;">
                <span class="count label">0/${total}</span>
                <div id="progress">
                    <span class="count label" style="width: ${width}px;">
                        0/${total}
                    </span>
                </div>
            </div>
        `;

        if (this.isMobile) {
            jQuery('#content_value').eq(0).prepend(preloaderContent);
        } else {
            jQuery('#contentContainer').eq(0).prepend(preloaderContent);
        }
    },
    sumOfArrayItemValues: function (array) {
        return array.reduce((a, b) => a + b, 0);
    },
    timeAgo: function (seconds) {
        var interval = seconds / 31536000;
        if (interval > 1) return Math.floor(interval) + ' Y';

        interval = seconds / 2592000;
        if (interval > 1) return Math.floor(interval) + ' M';

        interval = seconds / 86400;
        if (interval > 1) return Math.floor(interval) + ' D';

        interval = seconds / 3600;
        if (interval > 1) return Math.floor(interval) + ' H';

        interval = seconds / 60;
        if (interval > 1) return Math.floor(interval) + ' m';

        return Math.floor(seconds) + ' s';
    },
    tt: function (string) {
        if (this.translations[game_data.locale] !== undefined) {
            return this.translations[game_data.locale][string];
        } else {
            return this.translations['en_DK'][string];
        }
    },
    updateProgress: function (elementToUpate, itemsLength, index) {
        jQuery(elementToUpate).text(`${index}/${itemsLength}`);
    },
    updateProgressBar: function (index, total) {
        jQuery('#progress').css('width', `${((index + 1) / total) * 100}%`);
        jQuery('.count').text(`${index + 1}/${total}`);
        if (index + 1 == total) {
            jQuery('#progressbar').fadeOut(1000);
        }
    },
    toggleUploadButtonStatus: function (elementToToggle) {
        jQuery(elementToToggle).attr('disabled', (i, v) => !v);
    },
    xml2json: function ($xml) {
        let data = {};
        const _self = this;
        $.each($xml.children(), function (i) {
            let $this = $(this);
            if ($this.children().length > 0) {
                data[$this.prop('tagName')] = _self.xml2json($this);
            } else {
                data[$this.prop('tagName')] = $.trim($this.text());
            }
        });
        return data;
    },
    worldDataAPI: async function (entity) {
        const TIME_INTERVAL = 60 * 60 * 1000; // fetch data every hour
        const LAST_UPDATED_TIME = localStorage.getItem(
            `${entity}_last_updated`
        );

        // check if entity is allowed and can be fetched
        const allowedEntities = ['village', 'player', 'ally', 'conquer'];
        if (!allowedEntities.includes(entity)) {
            throw new Error(`Entity ${entity} does not exist!`);
        }

        // initial world data
        const worldData = {};

        const dbConfig = {
            village: {
                dbName: 'villagesDb',
                dbTable: 'villages',
                key: 'villageId',
                url: twSDK.worldDataVillages,
            },
            player: {
                dbName: 'playersDb',
                dbTable: 'players',
                key: 'playerId',
                url: twSDK.worldDataPlayers,
            },
            ally: {
                dbName: 'tribesDb',
                dbTable: 'tribes',
                key: 'tribeId',
                url: twSDK.worldDataTribes,
            },
            conquer: {
                dbName: 'conquerDb',
                dbTable: 'conquer',
                key: '',
                url: twSDK.worldDataConquests,
            },
        };

        // Helpers: Fetch entity data and save to localStorage
        const fetchDataAndSave = async () => {
            const DATA_URL = dbConfig[entity].url;

            try {
                // fetch data
                const response = await jQuery.ajax(DATA_URL);
                const data = twSDK.csvToArray(response);
                let responseData = [];

                // prepare data to be saved in db
                switch (entity) {
                    case 'village':
                        responseData = data
                            .filter((item) => {
                                if (item[0] != '') {
                                    return item;
                                }
                            })
                            .map((item) => {
                                return {
                                    villageId: parseInt(item[0]),
                                    villageName: twSDK.cleanString(item[1]),
                                    villageX: item[2],
                                    villageY: item[3],
                                    playerId: parseInt(item[4]),
                                    villagePoints: parseInt(item[5]),
                                    villageType: parseInt(item[6]),
                                };
                            });
                        break;
                    case 'player':
                        responseData = data
                            .filter((item) => {
                                if (item[0] != '') {
                                    return item;
                                }
                            })
                            .map((item) => {
                                return {
                                    playerId: parseInt(item[0]),
                                    playerName: twSDK.cleanString(item[1]),
                                    tribeId: parseInt(item[2]),
                                    villages: parseInt(item[3]),
                                    points: parseInt(item[4]),
                                    rank: parseInt(item[5]),
                                };
                            });
                        break;
                    case 'ally':
                        responseData = data
                            .filter((item) => {
                                if (item[0] != '') {
                                    return item;
                                }
                            })
                            .map((item) => {
                                return {
                                    tribeId: parseInt(item[0]),
                                    tribeName: twSDK.cleanString(item[1]),
                                    tribeTag: twSDK.cleanString(item[2]),
                                    players: parseInt(item[3]),
                                    villages: parseInt(item[4]),
                                    points: parseInt(item[5]),
                                    allPoints: parseInt(item[6]),
                                    rank: parseInt(item[7]),
                                };
                            });
                        break;
                    case 'conquer':
                        responseData = data
                            .filter((item) => {
                                if (item[0] != '') {
                                    return item;
                                }
                            })
                            .map((item) => {
                                return {
                                    villageId: parseInt(item[0]),
                                    unixTimestamp: parseInt(item[1]),
                                    newPlayerId: parseInt(item[2]),
                                    newPlayerId: parseInt(item[3]),
                                    oldTribeId: parseInt(item[4]),
                                    newTribeId: parseInt(item[5]),
                                    villagePoints: parseInt(item[6]),
                                };
                            });
                        break;
                    default:
                        return [];
                }

                // save data in db
                saveToIndexedDbStorage(
                    dbConfig[entity].dbName,
                    dbConfig[entity].dbTable,
                    dbConfig[entity].key,
                    responseData
                );

                // update last updated localStorage item
                localStorage.setItem(
                    `${entity}_last_updated`,
                    Date.parse(new Date())
                );

                return responseData;
            } catch (error) {
                throw Error(`Error fetching ${DATA_URL}`);
            }
        };

        // Helpers: Save to IndexedDb storage
        async function saveToIndexedDbStorage(dbName, table, keyId, data) {
            const dbConnect = indexedDB.open(dbName);

            dbConnect.onupgradeneeded = function () {
                const db = dbConnect.result;
                if (keyId.length) {
                    db.createObjectStore(table, {
                        keyPath: keyId,
                    });
                } else {
                    db.createObjectStore(table, {
                        autoIncrement: true,
                    });
                }
            };

            dbConnect.onsuccess = function () {
                const db = dbConnect.result;
                const transaction = db.transaction(table, 'readwrite');
                const store = transaction.objectStore(table);
                store.clear(); // clean store from items before adding new ones

                data.forEach((item) => {
                    store.put(item);
                });

                UI.SuccessMessage('Database updated!');
            };
        }

        // Helpers: Read all villages from indexedDB
        function getAllData(dbName, table) {
            return new Promise((resolve, reject) => {
                const dbConnect = indexedDB.open(dbName);

                dbConnect.onsuccess = () => {
                    const db = dbConnect.result;

                    const dbQuery = db
                        .transaction(table, 'readwrite')
                        .objectStore(table)
                        .getAll();

                    dbQuery.onsuccess = (event) => {
                        resolve(event.target.result);
                    };

                    dbQuery.onerror = (event) => {
                        reject(event.target.error);
                    };
                };

                dbConnect.onerror = (event) => {
                    reject(event.target.error);
                };
            });
        }

        // Helpers: Transform an array of objects into an array of arrays
        function objectToArray(arrayOfObjects, entity) {
            switch (entity) {
                case 'village':
                    return arrayOfObjects.map((item) => [
                        item.villageId,
                        item.villageName,
                        item.villageX,
                        item.villageY,
                        item.playerId,
                        item.villagePoints,
                        item.villageType,
                    ]);
                case 'player':
                    return arrayOfObjects.map((item) => [
                        item.playerId,
                        item.playerName,
                        item.tribeId,
                        item.villages,
                        item.points,
                        item.rank,
                    ]);
                case 'ally':
                    return arrayOfObjects.map((item) => [
                        item.tribeId,
                        item.tribeName,
                        item.tribeTag,
                        item.players,
                        item.villages,
                        item.points,
                        item.allPoints,
                        item.rank,
                    ]);
                case 'conquer':
                    return arrayOfObjects.map((item) => [
                        item.villageId,
                        item.unixTimestamp,
                        item.newPlayerId,
                        item.newPlayerId,
                        item.oldTribeId,
                        item.newTribeId,
                        item.villagePoints,
                    ]);
                default:
                    return [];
            }
        }

        // decide what to do based on current time and last updated entity time
        if (LAST_UPDATED_TIME !== null) {
            if (
                Date.parse(new Date()) >=
                parseInt(LAST_UPDATED_TIME) + TIME_INTERVAL
            ) {
                worldData[entity] = await fetchDataAndSave();
            } else {
                worldData[entity] = await getAllData(
                    dbConfig[entity].dbName,
                    dbConfig[entity].dbTable
                );
            }
        } else {
            worldData[entity] = await fetchDataAndSave();
        }

        // transform the data so at the end an array of array is returned
        worldData[entity] = objectToArray(worldData[entity], entity);

        return worldData[entity];
    },
    zeroPad: function (num, count) {
        var numZeropad = num + '';
        while (numZeropad.length < count) {
            numZeropad = '0' + numZeropad;
        }
        return numZeropad;
    },

    // initialize library
    init: async function (scriptConfig) {
        const {
            scriptData,
            translations,
            allowedMarkets,
            allowedScreens,
            allowedModes,
            isDebug,
            enableCountApi,
        } = scriptConfig;

        this.scriptData = scriptData;
        this.translations = translations;
        this.allowedMarkets = allowedMarkets;
        this.allowedScreens = allowedScreens;
        this.allowedModes = allowedModes;
        this.enableCountApi = enableCountApi;
        this.isDebug = isDebug;

        twSDK._initDebug();
    },
};


/*
By uploading a user-generated mod (script) for use with Tribal Wars, the creator grants InnoGames a perpetual, irrevocable, worldwide, royalty-free, non-exclusive license to use, reproduce, distribute, publicly display, modify, and create derivative works of the mod. This license permits InnoGames to incorporate the mod into any aspect of the game and its related services, including promotional and commercial endeavors, without any requirement for compensation or attribution to the uploader. The uploader represents and warrants that they have the legal right to grant this license and that the mod does not infringe upon any third-party rights.
*/


// User Input
if (typeof DEBUG !== 'boolean') DEBUG = false;

// CONSTANTS
var allIdsCLG = [
    // Player List
    "pl-players-Players",
    "pl-tribes-Tribes",
    "pl-excluded-players-Players",
    "pl-min-points",
    "pl-max-points",
    "pl-min-villages",
    "pl-max-villages",
    "pl-separator",
    "pl-coordinates",

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

    //Coordinate Filter
    "cf-players-Players",
    "cf-tribes-Tribes",
    "cf-min-points",
    "cf-max-points",
    "cf-coordinate-occurrence",
    "cf-barb-villages",
    "cf-excluded-coordinates",
    "cf-coordinates",
    "cf-number-coordinates",

];
var buttonIDs = [
    "copy-f-frontline-display",
    "copy-fl-target-coordinates-display",
    "copy-fl-fakelist-display",
    "copy-vl-coordinates-display",
    "copy-pl-player-list-display",
    "copy-cf-coordinates-display",
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
var DEFAULT_COORDINATE_OCCURRENCE = 0;



var scriptConfig = {
    scriptData: {
        prefix: 'sbCLG',
        name: 'Coordinate List Generator',
        version: 'v1.2.2',
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
            'Coordinate filter': 'Coordinate filter',
            'Max Occurrences Per Coordinate (0 ignores this setting)': 'Max Occurrences Per Coordinate (0 ignores this setting)',
            'Remove barbarian villages?': 'Remove barbarian villages?',
            'Exclude Coordinates:': 'Exclude Coordinates:',
            'The coordinates to be filtered:': 'The coordinates to be filtered:',
            'Filter Coordinates': 'Filter Coordinates',
            'Enter coordinates you want to remove...': 'Enter coordinates you want to remove...',
            'Enter coordinates...': 'Enter coordinates...',
            'Number Coordinates?': 'Number Coordinates?',
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
            'Calculate Fakelist': 'Fakeliste berechnen',
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
            'Target Coordinates:': 'Zielkoordinaten:',
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
            'Frontline Coordinates:': 'Frontdörfer Koordinaten:',
            'Calculate Frontline': 'Frontdörfer berechnen',
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
            'Coordinate filter': 'Koordinatenfilter',
            'Max Occurrences Per Coordinate (0 ignores this setting)': 'Max Vorkommen pro Koordinate (0 ignoriert diese Einstellung)',
            'Remove barbarian villages?': 'Barbarendörfer entfernen?',
            'Exclude Coordinates:': 'Zu entfernende Koordinaten',
            'The coordinates to be filtered:': 'Zu filternde Koordinaten:',
            'Filter Coordinates': 'Koordinaten filtern',
            'Enter coordinates you want to remove...': 'Zu entfernende Koordinaten eingeben...',
            'Enter coordinates...': 'Koordinaten eingeben...',
            'Number Coordinates?': 'Koordinaten nummerieren?',
        }
    }
    ,
    allowedMarkets: [],
    allowedScreens: ['overview_villages'],
    allowedModes: ['combined'],
    isDebug: DEBUG,
    enableCountApi: false
};



(async function () {
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
    const allVillages = new Map(villages.map(village => [`${village[2]}|${village[3]}`, [village[0], village[4], village[5]]]));
    const allPlayers = new Map(players.map(player => [player[0], player.slice(1)]));
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
        const coordinateFilterContent = renderCoordinateFilter();
        let content = `
        <div id="menu" class="sb-grid sb-grid-5">
            <div>
                ${menuContent}
            </div>
            <div class="ra-tac">
                <button id="resetInput" >${twSDK.tt('Reset Input')}</button>
            </div>
            <div> </div>
            <div> </div>
            <div> </div>
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
        <div id="coordinatefilter">
            ${coordinateFilterContent}
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
            $('#fakelist, #villagelist, #playerlist, #frontline, #coordinatefilter').hide();
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

        $('#filter-coordinates').on('click', function () {
            filterCoordinates();
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
            allIdsCLG.forEach(function (id) {
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
            $('#fl-result-coordinates-legend').text(twSDK.tt('Target Coordinates:') + ' ' + finalEnemyCoordinates.length);
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
            .filter(village => finalAllyPlayerIds.includes(village[4]))
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
        $('#f-result-legend').text(twSDK.tt('Frontline Coordinates:') + ' ' + finalEnemyCoordinates.length);

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
        let coordinates = localStorageSettings["pl-coordinates"];

        let playerNames = [];
        let additionalPlayerNames = [];
        let coordinatePlayerNames = [];

        tribeInput = tribeInput.filter(item => item);
        playerInput = playerInput.filter(item => item);
        playersToExclude = playersToExclude.filter(item => item);
        coordinates = coordinates.match(twSDK.coordsRegex) || [];

        if (DEBUG) console.debug(`${scriptInfo}: Coordinates found in calculatePlayerList(): `, coordinates);


        coordinates.forEach(coord => {
            const village = allVillages.get(coord);
            if (village) {
                let name = allPlayers.get(village[1])[0];
                if (!name) {
                    console.warn(`${scriptInfo}: Player that owns ${coord} does not exist.`);
                    return;
                }
                if (!playersToExclude.includes(name)) {
                    coordinatePlayerNames.push(name);
                }
            }
        });


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

        let finalPlayerNames = [...new Set([...playerNames, ...additionalPlayerNames, ...coordinatePlayerNames])];

        let playerNamesString = finalPlayerNames.join(separator);
        $('#pl-player-list-display').val(playerNamesString);
        $(`#pl-result-legend`).text(twSDK.tt('Players:') + ' ' + finalPlayerNames.length);
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
        $(`#vl-result-legend`).text(twSDK.tt('Target Coordinates:') + ' ' + coordinates.length);

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

    function filterCoordinates() {
        if (DEBUG) console.debug(`${scriptInfo}: Started filtering coordinates`);
        const startTime = performance.now();
        resetOutput("coordinatefilter");

        const localStorageSettings = getLocalStorage();
        let playerInput = localStorageSettings["cf-players-Players"].split(",");
        let tribeInput = localStorageSettings["cf-tribes-Tribes"].split(",");
        let minPoints = parseInt(localStorageSettings["cf-min-points"]);
        let maxPoints = parseInt(localStorageSettings["cf-max-points"]);
        let coordinateOccurrence = parseInt(localStorageSettings["cf-coordinate-occurrence"]);
        let barbVillagesBool = parseBool(localStorageSettings["cf-barb-villages"]);
        let numberedBool = parseBool(localStorageSettings["cf-number-coordinates"]);
        let excludedCoordinates = localStorageSettings["cf-excluded-coordinates"];
        let coordinates = localStorageSettings["cf-coordinates"];

        tribeInput = tribeInput.filter(item => item);
        playerInput = playerInput.filter(item => item);

        excludedCoordinates = excludedCoordinates.match(twSDK.coordsRegex) || [];
        coordinates = coordinates.match(twSDK.coordsRegex) || [];

        if (DEBUG) console.debug(`${scriptInfo}: Coordinates found in filterCoordinates(): `, coordinates);
        if (DEBUG) console.debug(`${scriptInfo}: Excluded Coordinates found in filterCoordinates(): `, excludedCoordinates);

        let playerIds = [];
        let additionalPlayerIds = [];

        playerInput.forEach(inputName => {
            let playerExists = players.find(player => player[1] === inputName);
            if (playerExists) {
                playerIds.push(playerExists[0]);
            }
        });

        tribeInput.forEach(tribeName => {
            let tribe = tribes.find(tribe => tribe[2] === tribeName);
            if (!tribe) {
                console.warn(`${scriptInfo}: Tribe named ${tribeName} does not exist.`);
                return;
            }
            let tribeId = tribe[0];
            players.forEach(player => {
                if (player[2] === tribeId) {
                    additionalPlayerIds.push(player[0]);
                }
            });
        });

        let finalPlayerIdsToExclude = [...new Set([...playerIds, ...additionalPlayerIds])];

        if (DEBUG) console.debug(`${scriptInfo}: Player Ids to exclude found in filterCoordinates(): `, finalPlayerIdsToExclude);

        if (barbVillagesBool) {
            finalPlayerIdsToExclude.push(0);
        }
        let excludedVillages = [];

        if (excludedCoordinates) {
            excludedCoordinates.forEach(coord => {
                const village = allVillages.get(coord);
                if (village) {
                    excludedVillages.push(village[0]);
                }
            });
        }

        if (DEBUG) console.debug(`${scriptInfo}: Villages to exclude found in filterCoordinates(): `, excludedVillages);


        let coordinateVillages = [];

        coordinates.forEach(coord => {
            const village = allVillages.get(coord);
            if (village) {
                if (!finalPlayerIdsToExclude.includes(village[1]) && !excludedVillages.includes(village[0]) && village[2] >= minPoints && village[2] <= maxPoints) {
                    coordinateVillages.push(coord);
                }
            }
        });


        if (coordinateOccurrence > 0) {
            let coordinateCount = {};
            let filteredCoordinateVillages = [];

            coordinateVillages.forEach(coord => {
                coordinateCount[coord] = (coordinateCount[coord] || 0) + 1;
                if (coordinateCount[coord] <= coordinateOccurrence) {
                    filteredCoordinateVillages.push(coord);
                }
            });

            coordinateVillages = filteredCoordinateVillages;
        }

        if (DEBUG) console.debug(`${scriptInfo}: Result Coordinates found in filterCoordinates(): `, coordinateVillages);

        let output = "";
        if (numberedBool) {
            coordinateVillages.forEach((coord, index) => {
                output += `${index + 1}. ${coord}\n`;
            });
        } else {
            for (let coordinate of coordinateVillages) {
                output += `${coordinate} `;
            }
        }

        $('#cf-coordinates-display').val(output);
        $(`#cf-result-legend`).text(twSDK.tt('Coordinates:') + ' ' + coordinateVillages.length);
        $(`#filter-coordinates-result`).show();
        const endTime = performance.now();
        if (DEBUG) console.debug(`${scriptInfo}: Calculation time for filterCoordinates(): ${(endTime - startTime).toFixed(2)} milliseconds`);
    }

    function renderDropdownMenu() {
        html = `
        <select id="selection-menu" class="ra-mb10">
            <option value="fakelist">${twSDK.tt('Fakelist')}</option>
            <option value="frontline">${twSDK.tt('Frontline')}</option>
            <option value="villagelist">${twSDK.tt('Village list')}</option>
            <option value="playerlist">${twSDK.tt('Player list')}</option>
            <option value="coordinatefilter">${twSDK.tt('Coordinate filter')}</option>
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
<div class="ra-mb10" class="coordinate-input">
    <fieldset>
        <legend>${twSDK.tt('Coordinates:')}</legend>
        <textarea id="pl-coordinates" class="ra-textarea sb-coord-input" placeholder="${twSDK.tt('Enter coordinates...')}"></textarea>
    </fieldset>
</div>
<div class="ra-mb10">
    <a href="javascript:void(0);" id="calculate-player-list" class="btn btn-confirm-yes onclick="">
        ${twSDK.tt('Calculate Player List')}
    </a>
</div>
<div id="player-list-result" style="display: none;">
    <fieldset>
        <legend id="pl-result-legend">${twSDK.tt('Players:')}</legend>
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
            <legend id="vl-result-legend">${twSDK.tt('Coordinates:')}</legend>
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
                <legend id="fl-result-coordinates-legend">${twSDK.tt('Target Coordinates:')}</legend>
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
                <legend id="f-result-legend">${twSDK.tt('Frontline Coordinates:')}</legend>
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

    function renderCoordinateFilter() {
        const dropdownPlayer = buildDropDown(players, "Players", "cf-players");
        const dropdownTribe = buildDropDown(tribes, "Tribes", "cf-tribes");
        const copyButtonCoordinateFilter = generateCopyButton("cf-coordinates-display");

        let html =
            `
        <div class="sb-grid sb-grid-2 ra-mb10">
            <fieldset>
                <legend>${twSDK.tt('Players (Separate with \',\')')}</legend>
                ${dropdownPlayer}
            </fieldset>
            <fieldset>
                <legend>${twSDK.tt('Tribes (Separate with \',\')')}</legend>
                ${dropdownTribe}
            </fieldset>
        </div>
        <div class="ra-mb10 sb-grid sb-grid-5">
            <fieldset>
                <legend>${twSDK.tt('Min Village Points')}</legend>
                <input type="number" id="cf-min-points" value="0"/>
            </fieldset>
            <fieldset>
                <legend>${twSDK.tt('Max Village Points')}</legend>
                <input type="number" id="cf-max-points" value="99999999"/>
            </fieldset>
            <fieldset>
                <legend>${twSDK.tt('Max Occurrences Per Coordinate (0 ignores this setting)')}</legend>
                <input type="number" id="cf-coordinate-occurrence" value="1"/>
            </fieldset>
            <fieldset>
                <legend>${twSDK.tt('Remove barbarian villages?')}</legend>
                <input type="checkbox" id="cf-barb-villages"/>
            </fieldset>
            <fieldset>
                <legend>${twSDK.tt('Number Coordinates?')}</legend>
                <input type="checkbox" id="cf-number-coordinates"/>
                </fieldset>
        </div>
        <div class="ra-mb10" class="coordinate-input">
            <fieldset>
                <legend>${twSDK.tt('Exclude Coordinates:')}</legend>
                <textarea id="cf-excluded-coordinates" class="ra-textarea sb-coord-input" placeholder="${twSDK.tt('Enter coordinates you want to remove...')}"></textarea>
            </fieldset>
            <fieldset>
                <legend>${twSDK.tt('The coordinates to be filtered:')}</legend>
                <textarea id="cf-coordinates" class="ra-textarea sb-coord-input" placeholder="${twSDK.tt('Enter coordinates...')}"></textarea>
            </fieldset>
        </div>

        <div class="ra-mb10">
            <a href="javascript:void(0);" id="filter-coordinates" class="btn btn-confirm-yes onclick="">
                ${twSDK.tt('Filter Coordinates')}
            </a>
        </div>
        <div id="filter-coordinates-result" style="display: none;">
            <fieldset>
                <legend id="cf-result-legend">${twSDK.tt('Coordinates:')}</legend>
                <textarea readonly id="cf-coordinates-display" class="result-text"></textarea>
                ${copyButtonCoordinateFilter}
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
                .sb-coord-input {
                    overflow: hidden;
                    resize: none;
                    scrollbar-width: none;
                    -ms-overflow-style: none;
                }
                #resetInput {
                    padding: 8px;
                    font-size: 12px;
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
                $(`#fl-result-coordinates-legend`).text(twSDK.tt('Target Coordinates:'));
                $(`#fakelist-result`).hide();
                $(`#fl-fakelist-display`).val("");
                $(`#fl-target-coordinates-div`).hide();
                $(`#fl-target-coordinates-display`).val("");
                $(`#fl-image-div`).hide();
                $(`#fl-image-display`).attr('src', "");
                break;
            case 'villagelist':
                if (DEBUG) console.debug(`${scriptInfo}: Reset output for ${input}`);
                $(`#vl-result-legend`).text(twSDK.tt('Coordinates:'));
                $(`#village-list-result`).hide();
                $(`#vl-coordinates-display`).val("");
                $(`#vl-image-div`).hide();
                $(`#vl-image-display`).attr('src', "");
                break;
            case 'playerlist':
                if (DEBUG) console.debug(`${scriptInfo}: Reset output for ${input}`);
                $(`#pl-result-legend`).text(twSDK.tt('Players:'));
                $(`#player-list-result`).hide();
                $(`#pl-player-list-display`).val("");
                break;
            case 'frontline':
                if (DEBUG) console.debug(`${scriptInfo}: Reset output for ${input}`);
                $(`#f-result-legend`).text(twSDK.tt('Frontline Coordinates:'));
                $(`#frontline-result`).hide();
                $(`#f-frontline-display`).val("");
                $(`#f-image-div`).hide();
                $(`#f-image-display`).attr('src', "");
                break;
            case 'coordinatefilter':
                if (DEBUG) console.debug(`${scriptInfo}: Reset output for ${input}`);
                $(`#cf-result-legend`).text(twSDK.tt('Coordinates:'));
                $(`#filter-coordinates-result`).hide();
                $(`#cf-coordinates-display`).val("");
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
                    $('#fakelist, #villagelist, #playerlist, #frontline, #coordinatefilter').hide();
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
            case "pl-coordinates":
                inputValue = $(this).val();
                let plMatchesCoordinates = inputValue.match(twSDK.coordsRegex) || [];
                inputValue = plMatchesCoordinates ? plMatchesCoordinates.join(' ') : '';
                $(this).val(inputValue);
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
            case "cf-players-Players":
                inputValue = $(this).val();
                if (!inputValue.trim()) {
                    $(this).val(inputValue);
                    break;
                }
                const cfPlayers = inputValue.split(",").filter(player => player.trim() !== "");
                const cfUniquePlayers = [...new Set(cfPlayers)];
                inputValue = cfUniquePlayers.join(",");
                $(this).val(inputValue);
                break;
            case "cf-tribes-Tribes":
                inputValue = $(this).val();
                if (!inputValue.trim()) {
                    $(this).val(inputValue);
                    break;
                }
                const cfTribes = inputValue.split(",").filter(tribe => tribe.trim() !== "");
                const cfUniqueTribes = [...new Set(cfTribes)];
                inputValue = cfUniqueTribes.join(",");
                $(this).val(inputValue);
                break;
            case "cf-min-points":
                inputValue = isNaN(parseInt($(this).val())) ? DEFAULT_MIN_VILLAGE_POINTS : parseInt($(this).val());
                if (inputValue < 0) {
                    $(this).val(DEFAULT_MIN_VILLAGE_POINTS);
                    inputValue = DEFAULT_MIN_VILLAGE_POINTS;
                } else {
                    $(this).val(inputValue)
                }
                break;
            case "cf-max-points":
                inputValue = isNaN(parseInt($(this).val())) ? DEFAULT_MAX_VILLAGE_POINTS : parseInt($(this).val());
                if (inputValue < 0) {
                    $(this).val(DEFAULT_MAX_VILLAGE_POINTS);
                    inputValue = DEFAULT_MAX_VILLAGE_POINTS;
                } else {
                    $(this).val(inputValue)
                }
                break;
            case "cf-coordinate-occurrence":
                inputValue = isNaN(parseInt($(this).val())) ? DEFAULT_COORDINATE_OCCURRENCE : parseInt($(this).val());
                if (inputValue < 0) {
                    $(this).val(DEFAULT_COORDINATE_OCCURRENCE);
                    inputValue = DEFAULT_COORDINATE_OCCURRENCE;
                } else {
                    $(this).val(inputValue)
                }
                break;
            case "cf-barb-villages":
                inputValue = $(this).prop("checked");
                break;
            case "cf-number-coordinates":
                inputValue = $(this).prop("checked");
                break;
            case "cf-excluded-coordinates":
                inputValue = $(this).val();
                let matchesExcluded = inputValue.match(twSDK.coordsRegex) || [];
                inputValue = matchesExcluded ? matchesExcluded.join(' ') : '';
                $(this).val(inputValue);
                break;
            case "cf-coordinates":
                inputValue = $(this).val();
                let matchesCoordinates = inputValue.match(twSDK.coordsRegex) || [];
                inputValue = matchesCoordinates ? matchesCoordinates.join(' ') : '';
                $(this).val(inputValue);
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
                localStorageSettings["pl-coordinates"] = "";
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
            case "coordinatefilter":
                // Reset other values specific to coordinatefilter
                localStorageSettings["cf-players-Players"] = "";
                localStorageSettings["cf-tribes-Tribes"] = "";
                localStorageSettings["cf-min-points"] = DEFAULT_MIN_VILLAGE_POINTS;
                localStorageSettings["cf-max-points"] = DEFAULT_MAX_VILLAGE_POINTS;
                localStorageSettings["cf-coordinate-occurrence"] = DEFAULT_COORDINATE_OCCURRENCE;
                localStorageSettings["cf-barb-villages"] = false;
                localStorageSettings["cf-number-coordinates"] = false;
                localStorageSettings["cf-excluded-coordinates"] = "";
                localStorageSettings["cf-coordinates"] = "";
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
        const localStorageSettings = JSON.parse(localStorage.getItem('sbCoordinateListGenerator'));
        // Check if all expected settings are in localStorageSettings
        const expectedSettings = [
            "selection-menu",
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
            // Player List
            "pl-players-Players",
            "pl-tribes-Tribes",
            "pl-excluded-players-Players",
            "pl-min-points",
            "pl-max-points",
            "pl-min-villages",
            "pl-max-villages",
            "pl-separator",
            "pl-coordinates",
            // Village List
            "vl-players-Players",
            "vl-tribes-Tribes",
            "vl-min-x-coordinate",
            "vl-max-x-coordinate",
            "vl-min-y-coordinate",
            "vl-max-y-coordinate",
            "vl-min-points",
            "vl-max-points",
            "vl-raw-coordinates",
            "vl-image",
            // Frontline
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
            // Coordinate Filter
            "cf-players-Players",
            "cf-tribes-Tribes",
            "cf-min-points",
            "cf-max-points",
            "cf-coordinate-occurrence",
            "cf-barb-villages",
            "cf-excluded-coordinates",
            "cf-coordinates",
            "cf-number-coordinates",
        ];

        let missingSettings = [];
        if (localStorageSettings) {
            missingSettings = expectedSettings.filter(setting => !(setting in localStorageSettings));
            if (DEBUG) console.debug(`${scriptInfo}: Missing settings in localStorage: `, missingSettings);
        }

        if (localStorageSettings && missingSettings.length === 0) {
            // If settings exist in localStorage  return the object
            return localStorageSettings;
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
                "pl-coordinates": "",

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

                // Coordinate Filter
                "cf-players-Players": "",
                "cf-tribes-Tribes": "",
                "cf-min-points": DEFAULT_MIN_VILLAGE_POINTS,
                "cf-max-points": DEFAULT_MAX_VILLAGE_POINTS,
                "cf-coordinate-occurrence": DEFAULT_COORDINATE_OCCURRENCE,
                "cf-barb-villages": false,
                "cf-number-coordinates": false,
                "cf-excluded-coordinates": "",
                "cf-coordinates": "",
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
})();