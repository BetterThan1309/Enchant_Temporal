// script2.js

// --- ข้อมูลการ Enchant และ Upgrade สำหรับไอเท็มใหม่ของคุณ ---
const ITEM_CONFIG = {
    ITEM_NAME: "Exotic Temporal Manteau-LT",
    ITEM_IMAGE_URL: "https://www.divine-pride.net/img/items/collection/thROG/480312", // **กรุณาเปลี่ยน URL รูปภาพนี้!**

    // ออฟชั่นทั่วไปที่สามารถ Enchant ได้ (สุ่มและเลือก)
    ALL_OPTIONS: ["Expert Archer", "Expert Fighter", "Expert Magician", "Spell", "LUK", "Critical"],

    // ค่าใช้จ่ายสำหรับ Enchant แบบสุ่ม
    RANDOM_ENCHANT_COST: {
        temporalSpell: 10,
        temporalGemstone: 10,
        zeny: 10000000, // 10,000,000 Zeny
        enchantTicket: 0
    },

    // ค่าใช้จ่ายสำหรับ Enchant แบบการันตี (สำหรับ Slot 4, 3)
    GUARANTEE_ENCHANT_COST: {
        temporalSpell: 50,
        temporalGemstone: 50,
        zeny: 50000000, // 50,000,000 Zeny
        enchantTicket: 1
    },

    // ค่าใช้จ่ายสำหรับ Enchant Spirit of Knight (สำหรับ Slot 2)
    KNIGHT_ENCHANT_COST: {
        temporalSpell: 50,
        temporalGemstone: 50,
        zeny: 50000000, // 50,000,000 Zeny
        enchantTicket: 3
    },

    

    // ข้อมูล Upgrade Enchant ทั่วไป (สำหรับ Expert, Spell, LUK, Critical)
    UPGRADE_DATA: {
        1: { spell: 20, gemstone: 10, zeny: 10000000, successRate: 100, ticket: 0 },
        2: { spell: 30, gemstone: 20, zeny: 20000000, successRate: 100, ticket: 0 },
        3: { spell: 50, gemstone: 30, zeny: 50000000, successRate: 100, ticket: 0 },
        4: { spell: 100, gemstone: 50, zeny: 100000000, successRate: 100, ticket: 0 }
    },

    // ข้อมูล Upgrade Enchant สำหรับ Spirit of Knight
    KNIGHT_UPGRADE_DATA: {
        1: { spell: 20, gemstone: 10, zeny: 10000000, successRate: 100, ticket: 0 },
        2: { spell: 30, gemstone: 20, zeny: 20000000, successRate: 100, ticket: 0 },
        3: { spell: 50, gemstone: 30, zeny: 50000000, successRate: 100, ticket: 0 },
        4: { spell: 100, gemstone: 50, zeny: 100000000, successRate: 100, ticket: 0 },
        5: { spell: 150, gemstone: 80, zeny: 0, successRate: 100, ticket: 3 }, // Zeny เป็น 0 เพราะใช้ Ticket
        6: { spell: 250, gemstone: 150, zeny: 0, successRate: 100, ticket: 3 }  // Zeny เป็น 0 เพราะใช้ Ticket
    },

    // ออฟชั่นที่เปลี่ยนชื่อเมื่อถึงระดับที่กำหนด
    SPECIAL_OPTION_NAMES: {
        "LUK": {
            1: "LUK+1",
            2: "LUK+2",
            3: "Post-Skill Delay Level 1",
            4: "Post-Skill Delay Level 2",
            5: "Post-Skill Delay Level 3"
        },
        "Critical": {
            1: "Critical",
            2: "Critical Lv1",
            3: "Critical Lv2",
            4: "Critical Lv3",
            5: "Critical Lv4"
        },
        "Expert Archer": {
            1: "Expert Archer 1Lv",
            2: "Expert Archer 2Lv",
            3: "Expert Archer 3Lv",
            4: "Expert Archer 4Lv",
            5: "Expert Archer 5Lv"
        },
        "Expert Fighter": {
            1: "Expert Fighter 1Lv",
            2: "Expert Fighter 2Lv",
            3: "Expert Fighter 3Lv",
            4: "Expert Fighter 4Lv",
            5: "Expert Fighter 5Lv"
        },
        "Expert Magician": {
            1: "Expert Magician 1Lv",
            2: "Expert Magician 2Lv",
            3: "Expert Magician 3Lv",
            4: "Expert Magician 4Lv",
            5: "Expert Magician 5Lv"
        },
        "Spell": {
            1: "Spell 1Lv",
            2: "Spell 2Lv",
            3: "Spell 3Lv",
            4: "Spell 4Lv",
            5: "Spell 5Lv"
        },
        "Spirit of Knight": {
            1: "Spirit of Knight Lv.1",
            2: "Spirit of Knight Lv.2",
            3: "Spirit of Knight Lv.3",
            4: "Spirit of Knight Lv.4",
            5: "Spirit of Knight Lv.5",
            6: "Spirit of Knight Lv.6",
            7: "Spirit of Knight Lv.7"
        }
    }
};

// --- ตัวแปรสถานะเกม ---
let totalResources = {
    temporalSpell: 0,
    temporalGemstone: 0,
    zeny: 0,
    silvervine: 0,
    enchantTicket: 0
};

let enchantSlots = {
    4: { name: "", level: 0 },
    3: { name: "", level: 0 },
    2: { name: "", level: 0 }
};

// --- DOM Elements ---
const itemImage = document.getElementById('item-image');
const itemName = document.getElementById('item-name');

const enchantDisplay = {
    4: document.getElementById('enchant-4-display'),
    3: document.getElementById('enchant-3-display'),
    2: document.getElementById('enchant-2-display')
};

const enchantLevelDisplay = {
    4: document.getElementById('enchant-4-level-display'),
    3: document.getElementById('enchant-3-level-display'),
    2: document.getElementById('enchant-2-level-display')
};

const baseEnchantSections = {
    4: document.querySelector('#slot-4 .base-enchant-section'),
    3: document.querySelector('#slot-3 .base-enchant-section'),
    2: document.querySelector('#slot-2 .base-enchant-section')
};

const enchantTypeSelectionButtons = document.querySelectorAll('.select-enchant-type');
const enchantOptionsContainers = {
    4: document.getElementById('enchant-options-4'),
    3: document.getElementById('enchant-options-3'),
    2: document.getElementById('enchant-options-2')
};

const randomEnchantOptionsDiv = {
    4: document.getElementById('random-enchant-4'),
    3: document.getElementById('random-enchant-3'),
    2: document.getElementById('random-enchant-2')
};
const guaranteeEnchantOptionsDiv = {
    4: document.getElementById('guarantee-enchant-4'),
    3: document.getElementById('guarantee-enchant-3'),
    2: document.getElementById('guarantee-enchant-2')
};
const knightEnchantOptionsDiv = {
    2: document.getElementById('knight-enchant-2')
};


const guaranteeEnchantSelects = {
    4: document.getElementById('guarantee-enchant-4-select'),
    3: document.getElementById('guarantee-enchant-3-select'),
    2: document.getElementById('guarantee-enchant-2-select')
};

const baseEnchantRandomCostDisplay = {
    4: document.getElementById('base-enchant-4-random-cost'),
    3: document.getElementById('base-enchant-3-random-cost'),
    2: document.getElementById('base-enchant-2-random-cost')
};
const baseEnchantGuaranteeCostDisplay = {
    4: document.getElementById('base-enchant-4-guarantee-cost'),
    3: document.getElementById('base-enchant-3-guarantee-cost'),
    2: document.getElementById('base-enchant-2-guarantee-cost')
};
const baseEnchantKnightCostDisplay = {
    2: document.getElementById('base-enchant-2-knight-cost')
};

const enchantButtons = document.querySelectorAll('.enchant-button');

const upgradeSections = {
    4: document.getElementById('upgrade-4-section'),
    3: document.getElementById('upgrade-3-section'),
    2: document.getElementById('upgrade-2-section')
};

const upgradeButtons = document.querySelectorAll('.upgrade-button');
const upgradeCostDisplay = {
    4: document.getElementById('upgrade-4-cost'),
    3: document.getElementById('upgrade-3-cost'),
    2: document.getElementById('upgrade-2-cost')
};

const upgradeLogDisplay = {
    4: document.getElementById('upgrade-4-log'),
    3: document.getElementById('upgrade-3-log'),
    2: document.getElementById('upgrade-2-log')
};

const totalTemporalSpell = document.getElementById('total-temporal-spell');
const totalTemporalGemstone = document.getElementById('total-temporal-gemstone');
const totalZeny = document.getElementById('total-zeny');
const totalSilvervine = document.getElementById('total-silvervine');
const totalEnchantTicket = document.getElementById('total-enchant-ticket');

// ปุ่ม Reset ที่เปลี่ยนไป
const resetSlotButtons = document.querySelectorAll('.reset-slot-button'); // เลือกปุ่มทั้งหมดที่มี class นี้
const restartSimulationButton = document.getElementById('restart-simulation');


// --- ฟังก์ชันช่วยเหลือ ---

function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function updateEnchantDisplay(slotNum) {
    const slot = enchantSlots[slotNum];
    const displayElement = enchantDisplay[slotNum];
    const baseSection = baseEnchantSections[slotNum];
    const upgradeSection = upgradeSections[slotNum];
    const enchantTypeButtonsForSlot = document.querySelectorAll(`#slot-${slotNum} .select-enchant-type`);

    if (slot.level === 0) {
        displayElement.textContent = "ว่าง";
        baseSection.style.display = 'block';
        enchantOptionsContainers[slotNum].style.display = 'none'; // ซ่อนคอนเทนเนอร์ตัวเลือกออฟชั่น
        enchantTypeButtonsForSlot.forEach(btn => btn.classList.remove('active')); // ลบ active class
        upgradeSection.style.display = 'none';
        upgradeLogDisplay[slotNum].innerHTML = ''; // Clear log
    } else {
        const optionName = slot.name;
        const level = slot.level;
        let displayLevelName;

        if (ITEM_CONFIG.SPECIAL_OPTION_NAMES[optionName] && ITEM_CONFIG.SPECIAL_OPTION_NAMES[optionName][level]) {
            displayLevelName = ITEM_CONFIG.SPECIAL_OPTION_NAMES[optionName][level];
        } else {
            displayLevelName = `${optionName} ${level}Lv`;
        }

        displayElement.textContent = displayLevelName;
        baseSection.style.display = 'none';
        upgradeSection.style.display = 'block';
        updateUpgradeCostDisplay(slotNum);
    }
}

function updateUpgradeCostDisplay(slotNum) {
    const slot = enchantSlots[slotNum];
    const currentLevel = slot.level;
    let upgradeData = ITEM_CONFIG.UPGRADE_DATA;
    let maxLevel = 5; // Default max level for general options

    if (slot.name === "Spirit of Knight") {
        upgradeData = ITEM_CONFIG.KNIGHT_UPGRADE_DATA;
        maxLevel = 7; // Max level for Spirit of Knight
    }

    const nextLevel = currentLevel + 1;
    const upgradeInfo = upgradeData[currentLevel]; 

    const costDisplay = upgradeCostDisplay[slotNum];
    const upgradeBtn = upgradeSections[slotNum].querySelector('.upgrade-button');

    if (currentLevel >= maxLevel) {
        costDisplay.innerHTML = `<span style="color: #2ecc71;">ออฟชั่นนี้ถึงระดับสูงสุดแล้ว!</span>`;
        upgradeBtn.disabled = true;
    } else if (upgradeInfo) {
        costDisplay.innerHTML = `
            <p><strong>Upgrade ${currentLevel} -> ${nextLevel}:</strong></p>
            <p>Temporal Spell: ${upgradeInfo.spell} ea</p>
            <p>Temporal Gemstone: ${upgradeInfo.gemstone} ea</p>
            <p>Zeny: ${formatNumber(upgradeInfo.zeny)}</p>
            ${upgradeInfo.ticket > 0 ? `<p>Enchant Ticket: ${upgradeInfo.ticket} ea</p>` : ''}
            <p>โอกาสสำเร็จ: ${upgradeInfo.successRate}%</p>
        `;
        upgradeBtn.disabled = false;
    } else {
        costDisplay.innerHTML = `<p>ไม่พบข้อมูลการอัปเกรดสำหรับขั้นนี้</p>`;
        upgradeBtn.disabled = true;
    }
}

function updateTotalResourcesDisplay() {
    totalTemporalSpell.textContent = formatNumber(totalResources.temporalSpell);
    totalTemporalGemstone.textContent = formatNumber(totalResources.temporalGemstone);
    totalZeny.textContent = formatNumber(totalResources.zeny);
    totalSilvervine.textContent = formatNumber(totalResources.silvervine);
    totalEnchantTicket.textContent = formatNumber(totalResources.enchantTicket);
}

function logUpgrade(slotNum, message, type = 'info') {
    const logElement = upgradeLogDisplay[slotNum];
    const p = document.createElement('p');
    p.textContent = message;
    if (type === 'success') {
        p.classList.add('log-success');
    } else if (type === 'fail') {
        p.classList.add('log-fail');
    }
    logElement.prepend(p);
    // Keep only the last 5 logs
    while (logElement.children.length > 5) {
        logElement.removeChild(logElement.lastChild);
    }
}

// ฟังก์ชันเติมตัวเลือกออฟชั่นลงใน Select Box
function populateSelectOptions(selectElement) {
    selectElement.innerHTML = '<option value="">-- เลือกออฟชั่น --</option>';
    ITEM_CONFIG.ALL_OPTIONS.forEach(option => {
        const opt = document.createElement('option');
        opt.value = option;
        opt.textContent = option;
        selectElement.appendChild(opt);
    });
}

// --- ฟังก์ชันหลักสำหรับการ Enchant ---

function handleEnchant(slotNum, method) {
    if (enchantSlots[slotNum].level > 0) {
        alert("สล็อตนี้มีออฟชั่นอยู่แล้ว! หากต้องการเปลี่ยนต้อง Reset ก่อน");
        return;
    }

    let selectedOption = "";
    let cost = {};

    if (method === "random") {
        selectedOption = ITEM_CONFIG.ALL_OPTIONS[Math.floor(Math.random() * ITEM_CONFIG.ALL_OPTIONS.length)];
        cost = ITEM_CONFIG.RANDOM_ENCHANT_COST;
    } else if (method === "guarantee") {
        selectedOption = guaranteeEnchantSelects[slotNum].value;
        if (!selectedOption) {
            alert("กรุณาเลือกออฟชั่นที่ต้องการ Enchant!");
            return;
        }
        cost = ITEM_CONFIG.GUARANTEE_ENCHANT_COST;
    } else if (method === "knight") {
        if (slotNum !== 2) {
            alert("Spirit of Knight สามารถ Enchant ได้เฉพาะ Slot 2 เท่านั้น!");
            return;
        }
        selectedOption = "Spirit of Knight";
        cost = ITEM_CONFIG.KNIGHT_ENCHANT_COST;
    } else {
        console.error("Invalid enchant method:", method);
        return;
    }

    // หักค่าใช้จ่าย
    totalResources.temporalSpell += cost.temporalSpell || 0;
    totalResources.temporalGemstone += cost.temporalGemstone || 0;
    totalResources.zeny += cost.zeny || 0;
    totalResources.enchantTicket += cost.enchantTicket || 0;

    // อัปเดตสถานะสล็อต
    enchantSlots[slotNum].name = selectedOption;
    enchantSlots[slotNum].level = 1;

    updateEnchantDisplay(slotNum);
    totalResources.temporalSpell++; // สมมติว่าทุกการ enchant ใช้ Temporal Spell 1 หน่วย, สามารถปรับค่านี้ได้
    updateTotalResourcesDisplay();
    // ใช้ SPECIAL_OPTION_NAMES สำหรับข้อความแจ้งเตือนหากมี
    alert(`Enchant Slot ${slotNum} สำเร็จ! ได้ออฟชั่น: ${ITEM_CONFIG.SPECIAL_OPTION_NAMES[selectedOption] && ITEM_CONFIG.SPECIAL_OPTION_NAMES[selectedOption][1] ? ITEM_CONFIG.SPECIAL_OPTION_NAMES[selectedOption][1] : selectedOption}`);
}

function handleUpgradeEnchant(slotNum) {
    const slot = enchantSlots[slotNum];
    if (slot.level === 0) {
        alert("สล็อตนี้ยังไม่มีออฟชั่น กรุณา Enchant ก่อน!");
        return;
    }

    let upgradeData = ITEM_CONFIG.UPGRADE_DATA;
    let maxLevel = 5;

    if (slot.name === "Spirit of Knight") {
        upgradeData = ITEM_CONFIG.KNIGHT_UPGRADE_DATA;
        maxLevel = 7;
    }

    if (slot.level >= maxLevel) {
        alert("ออฟชั่นนี้ถึงระดับสูงสุดแล้ว!");
        return;
    }

    const currentLevel = slot.level;
    const upgradeInfo = upgradeData[currentLevel];

    if (!upgradeInfo) {
        alert("ไม่พบข้อมูลการอัปเกรดสำหรับออฟชั่นและระดับนี้!");
        return;
    }

    // หักค่าใช้จ่าย
    totalResources.temporalSpell += upgradeInfo.spell || 0;
    totalResources.temporalGemstone += upgradeInfo.gemstone || 0;
    totalResources.zeny += upgradeInfo.zeny || 0;
    totalResources.enchantTicket += upgradeInfo.ticket || 0;

    // การอัพขั้น การออฟ โอกาสสำเร็จ 100% ตามโจทย์
    slot.level++;
    logUpgrade(slotNum, `อัปเกรด ${slot.name} เป็น ${slot.level}Lv สำเร็จ!`, 'success');

    updateEnchantDisplay(slotNum);
    updateTotalResourcesDisplay();
}

// --- ฟังก์ชัน Reset (ปรับเปลี่ยนใหม่) ---
function resetIndividualEnchantSlot(slotToReset) {
    // เพิ่มเงื่อนไขการตรวจสอบ: สามารถรีเซ็ตได้เมื่อมีออฟชั่นอยู่แล้วเท่านั้น
    if (enchantSlots[slotToReset].level === 0) {
        alert("ไม่สามารถรีเซ็ตได้! สล็อตนี้ยังไม่มีออฟชั่น.");
        return; // หยุดการทำงานของฟังก์ชันหากไม่มีออฟชั่น
    }

    const confirmMsg = `คุณแน่ใจหรือไม่ที่จะ Reset Enchant Slot ${slotToReset}? จะใช้ Silvervine 20ea`;
    if (confirm(confirmMsg)) {
        totalResources.silvervine += 20;
        enchantSlots[slotToReset] = { name: "", level: 0 };
        updateEnchantDisplay(parseInt(slotToReset));
        if (upgradeLogDisplay[slotToReset]) {
            upgradeLogDisplay[slotToReset].innerHTML = ''; // ล้าง log อัปเกรดของ Slot นั้น
        }
        // ซ่อนส่วนเลือกประเภท enchant และลบ active class
        const enchantOptionsContainer = enchantOptionsContainers[slotToReset];
        if (enchantOptionsContainer) {
            enchantOptionsContainer.style.display = 'none';
            document.querySelectorAll(`#slot-${slotToReset} .select-enchant-type`).forEach(btn => btn.classList.remove('active'));
        }
        updateTotalResourcesDisplay();
        alert(`Reset Enchant Slot ${slotToReset} เรียบร้อยแล้ว!`);
    }
}

function restartSimulation() {
    if (confirm("คุณแน่ใจหรือไม่ที่จะเริ่มการจำลองใหม่ทั้งหมด? ข้อมูลการ Enchant และทรัพยากรที่ใช้ไปจะถูกล้าง")) {
        totalResources = {
            temporalSpell: 0,
            temporalGemstone: 0,
            zeny: 0,
            silvervine: 0,
            enchantTicket: 0
        };

        for (const slotNum in enchantSlots) {
            enchantSlots[slotNum] = { name: "", level: 0 };
            updateEnchantDisplay(parseInt(slotNum));
            if(upgradeLogDisplay[slotNum]) {
                upgradeLogDisplay[slotNum].innerHTML = '';
            }
            const enchantOptionsContainer = enchantOptionsContainers[slotNum];
            if (enchantOptionsContainer) {
                enchantOptionsContainer.style.display = 'none';
                document.querySelectorAll(`#slot-${slotNum} .select-enchant-type`).forEach(btn => btn.classList.remove('active'));
            }
        }
        
        updateTotalResourcesDisplay();
        alert("การจำลองเริ่มต้นใหม่เรียบร้อยแล้ว!");
    }
}

function showEnchantTypeOptions(slotNum, type) {
    // ซ่อนทุกตัวเลือกก่อนสำหรับ slot นั้นๆ
    randomEnchantOptionsDiv[slotNum].style.display = 'none';
    guaranteeEnchantOptionsDiv[slotNum].style.display = 'none';
    if (knightEnchantOptionsDiv[slotNum]) { // Spirit of Knight มีแค่ Slot 2
        knightEnchantOptionsDiv[slotNum].style.display = 'none';
    }

    // แสดงตัวเลือกที่เลือก
    if (type === 'random') {
        randomEnchantOptionsDiv[slotNum].style.display = 'block';
    } else if (type === 'guarantee') {
        guaranteeEnchantOptionsDiv[slotNum].style.display = 'block';
    } else if (type === 'knight') {
        if (knightEnchantOptionsDiv[slotNum]) {
            knightEnchantOptionsDiv[slotNum].style.display = 'block';
        }
    }
    enchantOptionsContainers[slotNum].style.display = 'block'; // แสดง container หลัก

    // อัปเดต active class ของปุ่มประเภท
    const typeButtons = document.querySelectorAll(`#slot-${slotNum} .select-enchant-type`);
    typeButtons.forEach(btn => {
        if (btn.dataset.type === type) {
            btn.classList.add('active');
        } else {
            btn.classList.remove('active');
        }
    });
}


// --- Event Listeners ---
document.addEventListener('DOMContentLoaded', () => {
    // ตั้งค่าชื่อและรูปไอเทม
    itemName.textContent = ITEM_CONFIG.ITEM_NAME;
    itemImage.src = ITEM_CONFIG.ITEM_IMAGE_URL;

    // เติมตัวเลือกใน Select Box ของการันตีออฟชั่นสำหรับทุกสล็อต
    for (let slotNum of [4, 3, 2]) {
        populateSelectOptions(guaranteeEnchantSelects[slotNum]);
    }

    // แสดงค่าใช้จ่ายสำหรับ Enchant แบบสุ่ม
    for (let slotNum of [4, 3, 2]) {
        baseEnchantRandomCostDisplay[slotNum].innerHTML = `
            <p><strong>ค่าใช้จ่าย:</strong></p>
            <p>Temporal Spell: ${ITEM_CONFIG.RANDOM_ENCHANT_COST.temporalSpell} ea</p>
            <p>Temporal Gemstone: ${ITEM_CONFIG.RANDOM_ENCHANT_COST.temporalGemstone} ea</p>
            <p>Zeny: ${formatNumber(ITEM_CONFIG.RANDOM_ENCHANT_COST.zeny)}</p>
        `;
    }
    
    // แสดงค่าใช้จ่ายสำหรับ Enchant แบบการันตี (สำหรับ Slot 4, 3, 2)
    for (let slotNum of [4, 3, 2]) {
        baseEnchantGuaranteeCostDisplay[slotNum].innerHTML = `
            <p><strong>ค่าใช้จ่าย:</strong></p>
            <p>Temporal Spell: ${ITEM_CONFIG.GUARANTEE_ENCHANT_COST.temporalSpell} ea</p>
            <p>Temporal Gemstone: ${ITEM_CONFIG.GUARANTEE_ENCHANT_COST.temporalGemstone} ea</p>
            <p>Zeny: ${formatNumber(ITEM_CONFIG.GUARANTEE_ENCHANT_COST.zeny)}</p>
            ${ITEM_CONFIG.GUARANTEE_ENCHANT_COST.enchantTicket > 0 ? `<p>Enchant Ticket: ${ITEM_CONFIG.GUARANTEE_ENCHANT_COST.enchantTicket} ea</p>` : ''}
        `;
    }

    // แสดงค่าใช้จ่ายสำหรับ Spirit of Knight (เฉพาะ Slot 2)
    if (baseEnchantKnightCostDisplay[2]) {
        baseEnchantKnightCostDisplay[2].innerHTML = `
            <p><strong>ค่าใช้จ่าย:</strong></p>
            <p>Temporal Spell: ${ITEM_CONFIG.KNIGHT_ENCHANT_COST.temporalSpell} ea</p>
            <p>Temporal Gemstone: ${ITEM_CONFIG.KNIGHT_ENCHANT_COST.temporalGemstone} ea</p>
            <p>Zeny: ${formatNumber(ITEM_CONFIG.KNIGHT_ENCHANT_COST.zeny)}</p>
            ${ITEM_CONFIG.KNIGHT_ENCHANT_COST.enchantTicket > 0 ? `<p>Enchant Ticket: ${ITEM_CONFIG.KNIGHT_ENCHANT_COST.enchantTicket} ea</p>` : ''}
        `;
    }
    
    // Event Listeners สำหรับปุ่มเลือกประเภท Enchant (สุ่ม / การันตี / Knight)
    enchantTypeSelectionButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const slotNum = parseInt(event.target.dataset.slot);
            const type = event.target.dataset.type;
            showEnchantTypeOptions(slotNum, type);
        });
    });

    // Event Listeners สำหรับปุ่ม Enchant (ครอบคลุม Random, Guarantee, Knight)
    enchantButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const slotNum = parseInt(event.target.dataset.slot);
            const method = event.target.dataset.method;
            handleEnchant(slotNum, method);
        });
    });

    // Event Listeners สำหรับ Upgrade Enchant
    upgradeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const slotNum = parseInt(event.target.dataset.slot);
            handleUpgradeEnchant(slotNum);
        });
    });

    // Event Listeners สำหรับปุ่ม Reset แยกแต่ละ Slot
    resetSlotButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const slotNum = parseInt(event.target.dataset.slot);
            resetIndividualEnchantSlot(slotNum);
        });
    });
    
    // Event Listener สำหรับปุ่ม Restart Simulation
    restartSimulationButton.addEventListener('click', restartSimulation);

    // อัปเดตการแสดงผลเริ่มต้น
    updateTotalResourcesDisplay();
    updateEnchantDisplay(4);
    updateEnchantDisplay(3);
    updateEnchantDisplay(2);
});