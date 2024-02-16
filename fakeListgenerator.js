/*
* Script Name: Fakelist Generator
* Version: v1.0
* Last Updated: 2024-02-15
* Author: SaveBank
* Author URL: 
* Author Contact: Discord: savebank
* Approved: N/A
* Approved Date: N/A
* Mod: N/A
*/


// User Input
if (typeof DEBUG !== 'boolean') DEBUG = false;

// CONSTANTS
const allIds = [
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
// Globals

var scriptConfig = {
    scriptData: {
        prefix: 'sbFLG',
        name: 'Fakelist Generator',
        version: 'v1.0',
        author: 'SaveBank',
        authorUrl: 'https://forum.tribalwars.net/index.php?members/savebank.131111/',
        helpLink: '',
    },
    translations: {
        en_DK: {
            'Redirecting...': 'Redirecting...',
            Help: 'Help',
            'Fakelist Generator': 'Fakelist Generator',
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
        },
        de_DE: {
            'Redirecting...': 'Weiterleiten...',
            Help: 'Hilfe',
            'Fakelist Generator': 'Fakelisten Generator',
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
            'Calculate Player List': 'Calculate Player List',
            'Separator:': 'Trennzeichen:',
            'Players:': 'Players:',
            'Min Villages': 'Min Dörfer',
            'Max Villages': 'Max Dörfer',
            'Frontline Coordinates:': 'Frontline Koordinaten:',
            'Calculate Frontline': 'Frontline berechnen',
            'Exclude Players (Separate with \',\')': 'Ohne Spieler (Separate with \',\')'
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
            console.debug("INIT");
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
        const { tribes, players, villages, worldUnitInfo, worldConfig } = await fetchWorldConfigData();
        const endTime = performance.now();
        if (DEBUG) console.debug(`Startup time: ${(endTime - startTime).toFixed(4)} milliseconds`);

        // Entry point
        (async function () {
            try {
                const startTime = performance.now();
                renderUI();
                addEventHandlers();
                initializeInputFields();
                const endTime = performance.now();
                if (DEBUG) console.debug(`Time to initialize: ${(endTime - startTime).toFixed(4)} milliseconds`);
            } catch (error) {
                UI.ErrorMessage(twSDK.tt('There was an error!'));
                console.error(`${scriptInfo} Error:`, error);
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
            <div id="menu">
                ${menuContent}
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
            if (DEBUG) console.debug(`Time to render: ${(endTime - startTime).toFixed(4)} milliseconds`);
        }

        function addEventHandlers() {
            $('#selection-menu').on('change', function () {
                const selectedValue = $(this).val();
                $('#fakelist, #villagelist, #playerlist, #frontline').hide();
                $(`#${selectedValue}`).show();
                const localStorageSettings = getLocalStorage();
                localStorageSettings['selection-menu'] = selectedValue;
                saveLocalStorage(localStorageSettings);
                if (DEBUG) console.debug(`${scriptInfo}: selection-menu changed to ${selectedValue}`)
            });
            $(document).ready(function () {
                allIds.forEach(function (id) {
                    $('#' + id).on('change', handleInputChange);
                });
            });
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
            <legend>${twSDK.tt('Min Points')}</legend>
            <input type="number" id="pl-min-points" value="0"/>
        </fieldset>
        <fieldset>
            <legend>${twSDK.tt('Max Points')}</legend>
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
            // REMOVE IN LIVE
            const allyCoordinates = generateRandomCluster(300, 400, 700, 250);
            const enemyCoordinates = [];
            const hightlightedVillagesCoordinates = [];

            const imageDataUrl = createImage(allyCoordinates, enemyCoordinates, hightlightedVillagesCoordinates);

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
                <legend>${twSDK.tt('Min Points')}</legend>
                <input type="number" id="vl-min-points" value="0"/>
            </fieldset>
            <fieldset>
                <legend>${twSDK.tt('Max Points')}</legend>
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
            <fieldset id="vl-image-div">
                <legend>${twSDK.tt('Image:')}</legend>
                <img id="vl-image-display" src="${imageDataUrl}" alt="Image"/>
            </fieldset>
        </div>
    `

            return html;
        }

        function renderFakelist() {
            // REMOVE IN LIVE
            const allyCoordinates = generateRandomCluster(300, 400, 200, 100);
            const enemyCoordinates = generateRandomCluster(400, 500, 300, 50);
            const hightlightedVillagesCoordinates = generateRandomCluster(450, 540, 40, 20);

            const imageDataUrl = createImage(allyCoordinates, enemyCoordinates, hightlightedVillagesCoordinates);

            const dropdownAllyPlayer = buildDropDown(players, "Players", "fl-ally-players");
            const dropdownAllyTribe = buildDropDown(tribes, "Tribes", "fl-ally-tribes");
            const dropdownEnemyPlayer = buildDropDown(players, "Players", "fl-enemy-players");
            const dropdownEnemyTribe = buildDropDown(tribes, "Tribes", "fl-enemy-tribes");
            const copyButtonFakelist = generateCopyButton("fakelist-display");
            const copyButtonTargetCoordinates = generateCopyButton("fl-target-coordinates-display");
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
                    <legend>${twSDK.tt('Min Points')}</legend>
                    <input type="number" id="fl-min-points" value="0"/>
                </fieldset>
                <fieldset>
                    <legend>${twSDK.tt('Max Points')}</legend>
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
                <fieldset>
                    <legend>${twSDK.tt('Target Coordinates:')}</legend>
                    <textarea readonly id="fl-target-coordinates-display" class="result-text"></textarea>
                    ${copyButtonTargetCoordinates}
                </fieldset>
                <fieldset id="fl-image-div">
                    <legend>${twSDK.tt('Image:')}</legend>
                    <img id="fl-image-display" src="${imageDataUrl}" alt="Image"/>
                </fieldset>
            </div>
        `

            return html;
        }

        function renderFrontline() {
            // REMOVE IN LIVE
            const allyCoordinates = generateRandomCluster(300, 400, 200, 100);
            const enemyCoordinates = generateRandomCluster(400, 500, 300, 50);
            const hightlightedVillagesCoordinates = generateRandomCluster(450, 540, 40, 20);

            const imageDataUrl = createImage(allyCoordinates, enemyCoordinates, hightlightedVillagesCoordinates);

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
                    <legend>${twSDK.tt('Min Points')}</legend>
                    <input type="number" id="f-min-points" value="0"/>
                </fieldset>
                <fieldset>
                    <legend>${twSDK.tt('Max Points')}</legend>
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
                <fieldset id="f-image-div">
                    <legend>${twSDK.tt('Image:')}</legend>
                    <img id="f-image-display" src="${imageDataUrl}" alt="Image"/>
                </fieldset>
            </div>
        `

            return html;
        }

        function generateCSS() {
            // Define the colors
            const borderColor = '#c1a264';
            const lighterBackground = '#e3d5b3';
            const darkerBackground = '#c1a264';

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
                        grid-template-columns: 25% 25% 50%;
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
                    #pl-separator {
                        font-size: 15px;
                        width: 100%;
                    }
            `;

            return css;
        }
        function createImage(allyCoordinates, enemyCoordinates, hightlightedVillagesCoordinates) {
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');

            // Calculate cropping boundaries with a buffer of 30 pixels
            const minX = Math.max(0, Math.min(
                ...allyCoordinates.concat(enemyCoordinates, hightlightedVillagesCoordinates).map(([x]) => x)
            ) - 30);
            const minY = Math.max(0, Math.min(
                ...allyCoordinates.concat(enemyCoordinates, hightlightedVillagesCoordinates).map(([, y]) => y)
            ) - 30);
            const maxX = Math.min(1000, Math.max(
                ...allyCoordinates.concat(enemyCoordinates, hightlightedVillagesCoordinates).map(([x]) => x)
            ) + 30);
            const maxY = Math.min(1000, Math.max(
                ...allyCoordinates.concat(enemyCoordinates, hightlightedVillagesCoordinates).map(([, y]) => y)
            ) + 30);

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
                <button id="copy-${id} onclick="" class="btn">
                    ${twSDK.tt('Copy')}
                </button>
            `;
        }
        function initializeInputFields() {
            const settingsObject = getLocalStorage();
            if (DEBUG) console.debug(settingsObject);

            for (let id in settingsObject) {
                if (settingsObject.hasOwnProperty(id)) {
                    const element = document.getElementById(id);

                    if (element && element.type === 'checkbox') {
                        element.checked = settingsObject[id] === true;
                    } else if (element && id === 'selection-menu') {
                        $('#fakelist, #villagelist, #playerlist, #frontline').hide();
                        $(`#${settingsObject[id]}`).show();
                        element.value = settingsObject[id];
                    } else if (element) {
                        element.value = settingsObject[id];
                    } else {
                        console.error(`Element not found for ID: ${id} in ${settingsObject}`);
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
                    break;
                case "pl-tribes-Tribes":
                    inputValue = $(this).val();
                    break;
                case "pl-excluded-players-Players":
                    inputValue = $(this).val();
                    break;
                case "pl-min-points":
                    inputValue = $(this).val();
                    if (parseInt(inputValue) < 0) {
                        $(this).val(0);
                        inputValue = 0;
                    }
                    break;
                case "pl-max-points":
                    inputValue = $(this).val();
                    if (parseInt(inputValue) < 0) {
                        $(this).val(0);
                        inputValue = 0;
                    }
                    break;
                case "pl-min-villages":
                    inputValue = $(this).val();
                    if (parseInt(inputValue) < 0) {
                        $(this).val(0);
                        inputValue = 0;
                    }
                    break;
                case "pl-max-villages":
                    inputValue = $(this).val();
                    if (parseInt(inputValue) < 0) {
                        $(this).val(0);
                        inputValue = 0;
                    }
                    break;
                case "pl-separator":
                    inputValue = $(this).val();
                    break;
                case "vl-players-Players":
                    inputValue = $(this).val();
                    break;
                case "vl-tribes-Tribes":
                    inputValue = $(this).val();
                    break;
                case "vl-min-x-coordinate":
                    inputValue = $(this).val();
                    if (parseInt(inputValue) < 0) {
                        $(this).val(0);
                        inputValue = 0;
                    }
                    break;
                case "vl-max-x-coordinate":
                    inputValue = $(this).val();
                    if (parseInt(inputValue) < 0) {
                        $(this).val(0);
                        inputValue = 0;
                    }
                    break;
                case "vl-min-y-coordinate":
                    inputValue = $(this).val();
                    if (parseInt(inputValue) < 0) {
                        $(this).val(0);
                        inputValue = 0;
                    }
                    break;
                case "vl-max-y-coordinate":
                    inputValue = $(this).val();
                    if (parseInt(inputValue) < 0) {
                        $(this).val(0);
                        inputValue = 0;
                    }
                    break;
                case "vl-min-points":
                    inputValue = $(this).val();
                    if (parseInt(inputValue) < 0) {
                        $(this).val(0);
                        inputValue = 0;
                    }
                    break;
                case "vl-max-points":
                    inputValue = $(this).val();
                    if (parseInt(inputValue) < 0) {
                        $(this).val(0);
                        inputValue = 0;
                    }
                    break;
                case "vl-image":
                    inputValue = $(this).prop("checked");
                    break;
                case "vl-raw-coordinates":
                    inputValue = $(this).prop("checked");
                    break;
                case "fl-ally-players-Players":
                    inputValue = $(this).val();
                    break;
                case "fl-ally-tribes-Tribes":
                    inputValue = $(this).val();
                    break;
                case "fl-enemy-players-Players":
                    inputValue = $(this).val();
                    break;
                case "fl-enemy-tribes-Tribes":
                    inputValue = $(this).val();
                    break;
                case "fl-min-distance":
                    inputValue = $(this).val();
                    if (parseInt(inputValue) < 0) {
                        $(this).val(0);
                        inputValue = 0;
                    }
                    break;
                case "fl-max-distance":
                    inputValue = $(this).val();
                    if (parseInt(inputValue) < 0) {
                        $(this).val(0);
                        inputValue = 0;
                    }
                    break;
                case "fl-min-points":
                    inputValue = $(this).val();
                    if (parseInt(inputValue) < 0) {
                        $(this).val(0);
                        inputValue = 0;
                    }
                    break;
                case "fl-max-points":
                    inputValue = $(this).val();
                    if (parseInt(inputValue) < 0) {
                        $(this).val(0);
                        inputValue = 0;
                    }
                    break;
                case "fl-fakes-per-player":
                    inputValue = $(this).val();
                    if (parseInt(inputValue) < 0) {
                        $(this).val(0);
                        inputValue = 0;
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
                    inputValue = $(this).val();
                    if (parseInt(inputValue) < 0) {
                        $(this).val(0);
                        inputValue = 0;
                    }
                    break;
                case "fl-number-ally-villages-radius":
                    inputValue = $(this).val();
                    if (parseInt(inputValue) < 0) {
                        $(this).val(0);
                        inputValue = 0;
                    }
                    break;
                case "f-ally-players-Players":
                    inputValue = $(this).val();
                    break;
                case "f-ally-tribes-Tribes":
                    inputValue = $(this).val();
                    break;
                case "f-enemy-players-Players":
                    inputValue = $(this).val();
                    break;
                case "f-enemy-tribes-Tribes":
                    inputValue = $(this).val();
                    break;
                case "f-min-distance":
                    inputValue = $(this).val();
                    if (parseInt(inputValue) < 0) {
                        $(this).val(0);
                        inputValue = 0;
                    }
                    break;
                case "f-max-distance":
                    inputValue = $(this).val();
                    if (parseInt(inputValue) < 0) {
                        $(this).val(0);
                        inputValue = 0;
                    }
                    break;
                case "f-min-points":
                    inputValue = $(this).val();
                    if (parseInt(inputValue) < 0) {
                        $(this).val(0);
                        inputValue = 0;
                    }
                    break;
                case "f-max-points":
                    inputValue = $(this).val();
                    if (parseInt(inputValue) < 0) {
                        $(this).val(0);
                        inputValue = 0;
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
                    inputValue = $(this).val();
                    if (parseInt(inputValue) < 0) {
                        $(this).val(0);
                        inputValue = 0;
                    }
                    break;
                case "f-number-ally-villages-radius":
                    inputValue = $(this).val();
                    if (parseInt(inputValue) < 0) {
                        $(this).val(0);
                        inputValue = 0;
                    }
                    break;
                default:
                    console.error(`Unknown id: ${inputId}`)
            }
            if (DEBUG) console.debug(`${scriptInfo}: ${inputId} changed to ${inputValue}`)
            const settingsObject = getLocalStorage();
            settingsObject[inputId] = inputValue;
            saveLocalStorage(settingsObject);
        }
        // Service: Function to get settings from localStorage
        function getLocalStorage() {
            const localStorageSettings = localStorage.getItem('sbFakelistGenerator');

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
                    "pl-min-points": 0,
                    "pl-max-points": 99999999,
                    "pl-min-villages": 0,
                    "pl-max-villages": 99999,
                    "pl-separator": ",",

                    // Village List
                    "vl-players-Players": "",
                    "vl-tribes-Tribes": "",
                    "vl-min-x-coordinate": 0,
                    "vl-max-x-coordinate": 999,
                    "vl-min-y-coordinate": 0,
                    "vl-max-y-coordinate": 999,
                    "vl-min-points": 0,
                    "vl-max-points": 99999,
                    "vl-image": false,
                    "vl-raw-coordinates": false,

                    // Fakelist
                    "fl-ally-players-Players": "",
                    "fl-ally-tribes-Tribes": "",
                    "fl-enemy-players-Players": "",
                    "fl-enemy-tribes-Tribes": "",
                    "fl-min-distance": 0,
                    "fl-max-distance": 9999,
                    "fl-min-points": 0,
                    "fl-max-points": 99999,
                    "fl-fakes-per-player": 0,
                    "fl-filter-villages": false,
                    "fl-image": false,
                    "fl-display-targets": false,
                    "fl-raw-coordinates": false,
                    "fl-with-counts": false,
                    "fl-ally-village-radius": 10,
                    "fl-number-ally-villages-radius": 12,

                    // Frontline
                    "f-ally-players-Players": "",
                    "f-ally-tribes-Tribes": "",
                    "f-enemy-players-Players": "",
                    "f-enemy-tribes-Tribes": "",
                    "f-min-distance": 0,
                    "f-max-distance": 99999,
                    "f-min-points": 0,
                    "f-max-points": 99999,
                    "f-filter-villages": false,
                    "f-image": false,
                    "f-raw-coordinates": false,
                    "f-ally-village-radius": 10,
                    "f-number-ally-villages-radius": 12,
                };

                saveLocalStorage(defaultSettings);

                return defaultSettings;
            }
        }

        //Service: Function to save settings to localStorage
        function saveLocalStorage(settingsObject) {
            // Stringify and save the settings object
            localStorage.setItem('sbFakelistGenerator', JSON.stringify(settingsObject));
        }

        // Service: Fetch world config and needed data
        async function fetchWorldConfigData() {
            try {
                const worldUnitInfo = await twSDK.getWorldUnitInfo();
                const villages = await twSDK.worldDataAPI('village');
                const players = await twSDK.worldDataAPI('player');
                const tribes = await twSDK.worldDataAPI('ally');
                const worldConfig = await twSDK.getWorldConfig();
                return { tribes, players, villages, worldUnitInfo, worldConfig };
            } catch (error) {
                UI.ErrorMessage(
                    twSDK.tt('There was an error while fetching the data!')
                );
                console.error(`${scriptInfo} Error:`, error);
            }
        }
        // REMOVE IN LIVE
        function generateRandomCluster(centerX, centerY, size, range) {
            const cluster = [];

            for (let i = 0; i < size; i++) {
                const x = Math.round(centerX + (Math.random() - 0.5) * range);
                const y = Math.round(centerY + (Math.random() - 0.5) * range);
                cluster.push([x, y]);
            }

            return cluster;
        }

    }
);