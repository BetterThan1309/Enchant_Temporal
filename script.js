// --- ข้อมูลเกม (ปรับแก้ได้ตามต้องการ) ---
const ITEM_NAME = "White Knight Mantle"; // ชื่อไอเทม
const ITEM_IMAGE_URL = "https://www.divine-pride.net/img/items/collection/thROG/480500"; // URL รูปไอเทม (เปลี่ยนเป็นรูปของคุณ)

// ข้อมูล Base Enchant ทั่วไป
const BASE_ENCHANT_COST = {
    temporalSpell: 10,
    temporalGemstone: 10,
    zeny: 1000000,
    silvervine: 0 // ไม่มี Silvervine สำหรับ Base Enchant ปกติ
};

// ข้อมูล Base Enchant Spirit of Knight
const KNIGHT_ENCHANT_COST = {
    temporalSpell: 10,
    temporalGemstone: 10,
    zeny: 1000000,
    silvervine: 100
};

// ข้อมูล Upgrade Enchant ทั่วไป (สำหรับ Expert, Spell, LUK, Critical)
const UPGRADE_DATA = {
    1: { spell: 2, gemstone: 1, zeny: 10000, successRate: 70 },
    2: { spell: 3, gemstone: 2, zeny: 20000, successRate: 50 },
    3: { spell: 5, gemstone: 3, zeny: 50000, successRate: 35 },
    4: { spell: 10, gemstone: 5, zeny: 100000, successRate: 25 }
};

// ข้อมูล Upgrade Enchant สำหรับ Spirit of Knight
const KNIGHT_UPGRADE_DATA = {
    1: { spell: 2, gemstone: 1, zeny: 10000, successRate: 85 },
    2: { spell: 3, gemstone: 2, zeny: 20000, successRate: 70 },
    3: { spell: 5, gemstone: 3, zeny: 50000, successRate: 50 },
    4: { spell: 10, gemstone: 5, zeny: 100000, successRate: 35 },
    5: { spell: 15, gemstone: 8, zeny: 300000, successRate: 25 },
    6: { spell: 25, gemstone: 15, zeny: 500000, successRate: 18 }
};

// ออฟชั่นที่เปลี่ยนชื่อเมื่อถึงระดับที่กำหนด
const SPECIAL_OPTION_NAMES = {
    "LUK": {
        1: "LUK+1",
        2: "LUK+2",
        3: "Post-Skill Delay Level 1",
        4: "Post-Skill Delay Level 2",
        5: "Post-Skill Delay Level 3"
    },
    "Critical": {
        1: "Critical", // Lv1 ยังเป็น Critical เฉยๆ
        2: "Critical Lv1", // Lv2 เป็น Lv1
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
        7: "Spirit of Knight Lv.7" // Knight มี 7 ระดับ Base 1 + Upgrade 6
    }
};

// --- ตัวแปรสถานะเกม ---
let totalResources = {
    temporalSpell: 0,
    temporalGemstone: 0,
    silvervine: 0,
    zeny: 0
};

// Slot 2, 3, 4
let enchantSlots = {
    4: { name: "", level: 0 }, // level 0 = ว่าง, level 1 = Base Enchant
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
    4: document.getElementById('base-enchant-4-section'),
    3: document.getElementById('base-enchant-3-section'),
    2: document.getElementById('base-enchant-2-section')
};

const baseEnchantSelects = {
    4: document.getElementById('base-enchant-4-select'),
    3: document.getElementById('base-enchant-3-select'),
    2: document.getElementById('base-enchant-2-select')
};

const enchantButtons = document.querySelectorAll('.enchant-button');
const enchantKnightButton = document.querySelector('.enchant-knight-button'); // Assuming only one Knight button for slot 2

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
const totalSilvervine = document.getElementById('total-silvervine');
const totalZeny = document.getElementById('total-zeny');

const resetAllEnchantButton = document.getElementById('reset-all-enchant');
const resetSlot2EnchantButton = document.getElementById('reset-slot-2-enchant');
const restartSimulationButton = document.getElementById('restart-simulation'); // ปุ่มรีเซ็ตทั้งหมด


// ฟังก์ชันสำหรับฟอร์แมตตัวเลขให้มีคอมม่า
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

// ฟังก์ชันอัปเดตการแสดงผลออฟชั่น
function updateEnchantDisplay(slotNum) {
    const slot = enchantSlots[slotNum];
    const displayElement = enchantDisplay[slotNum];
    const levelDisplayElement = enchantLevelDisplay[slotNum];
    const baseSection = baseEnchantSections[slotNum];
    const upgradeSection = upgradeSections[slotNum];

    if (slot.level === 0) {
        displayElement.textContent = "ว่าง";
        levelDisplayElement.textContent = "";
        baseSection.style.display = 'block';
        upgradeSection.style.display = 'none';
        upgradeLogDisplay[slotNum].innerHTML = ''; // Clear log
    } else {
        const optionName = slot.name;
        const level = slot.level;
        let displayLevelName = `${level}Lv`;

        if (SPECIAL_OPTION_NAMES[optionName] && SPECIAL_OPTION_NAMES[optionName][level]) {
            displayLevelName = SPECIAL_OPTION_NAMES[optionName][level];
        } else if (optionName === "Spirit of Knight" && level === 1) { // Lv.1 ของ Knight เป็น Base Enchant
            displayLevelName = SPECIAL_OPTION_NAMES[optionName][level];
        } else if (optionName === "Spirit of Knight" && SPECIAL_OPTION_NAMES[optionName] && SPECIAL_OPTION_NAMES[optionName][level]) { // Knight LV.2+
            displayLevelName = SPECIAL_OPTION_NAMES[optionName][level];
        } else { // ออฟชั่นปกติ Lv2+
            displayLevelName = `${optionName} ${level}Lv`;
        }

        displayElement.textContent = displayLevelName;
        levelDisplayElement.textContent = ""; // ระดับจะรวมอยู่ในชื่อแล้ว
        baseSection.style.display = 'none'; // ซ่อนส่วน Base Enchant เมื่อออฟแล้ว
        upgradeSection.style.display = 'block'; // แสดงส่วน Upgrade
        updateUpgradeCostDisplay(slotNum);
    }
    // อัปเดตสถานะปุ่ม Reset เมื่อมีการเปลี่ยนแปลงการแสดงผล Enchant
    updateResetButtonStates();
}

// ฟังก์ชันอัปเดตการแสดงผลค่าใช้จ่ายในการ Upgrade
function updateUpgradeCostDisplay(slotNum) {
    const slot = enchantSlots[slotNum];
    const currentLevel = slot.level;
    let upgradeData = UPGRADE_DATA;
    let maxLevel = 5; // สำหรับออฟชั่นปกติ สูงสุด Lv5 (Base + 4 Upgrade)

    if (slot.name === "Spirit of Knight") {
        upgradeData = KNIGHT_UPGRADE_DATA;
        maxLevel = 7; // สำหรับ Knight สูงสุด Lv7 (Base + 6 Upgrade)
    }

    const nextLevel = currentLevel + 1;
    // ใช้ currentLevel เพราะข้อมูลใน UPGRADE_DATA คือระดับที่ต้องการอัปเกรดไปถึง
    const upgradeInfo = upgradeData[currentLevel]; 

    const costDisplay = upgradeCostDisplay[slotNum];
    const upgradeBtn = upgradeSections[slotNum].querySelector('.upgrade-button');

    if (currentLevel >= maxLevel) { // ตรวจสอบว่าถึงระดับสูงสุดแล้วหรือไม่
        costDisplay.innerHTML = `<span style="color: #2ecc71;">ออฟชั่นนี้ถึงระดับสูงสุดแล้ว!</span>`;
        upgradeBtn.disabled = true;
    } else if (upgradeInfo) {
        costDisplay.innerHTML = `
            <p><strong>Upgrade ${currentLevel} -> ${nextLevel}:</strong></p>
            <p>Temporal Spell: ${upgradeInfo.spell} ea</p>
            <p>Temporal Gemstone: ${upgradeInfo.gemstone} ea</p>
            <p>Zeny: ${formatNumber(upgradeInfo.zeny)}</p>
            <p>โอกาสสำเร็จ: ${upgradeInfo.successRate}%</p>
        `;
        upgradeBtn.disabled = false;
    } else {
        costDisplay.innerHTML = `<p>ไม่พบข้อมูลการอัปเกรดสำหรับขั้นนี้</p>`;
        upgradeBtn.disabled = true;
    }
}

// ฟังก์ชันอัปเดตการแสดงผลทรัพยากรรวม
function updateTotalResourcesDisplay() {
    totalTemporalSpell.textContent = formatNumber(totalResources.temporalSpell);
    totalTemporalGemstone.textContent = formatNumber(totalResources.temporalGemstone);
    totalSilvervine.textContent = formatNumber(totalResources.silvervine);
    totalZeny.textContent = formatNumber(totalResources.zeny);
}

// ฟังก์ชันบันทึก Log การอัปเกรด
function logUpgrade(slotNum, message, type = 'info') {
    const logElement = upgradeLogDisplay[slotNum];
    const p = document.createElement('p');
    p.textContent = message;
    if (type === 'success') {
        p.classList.add('log-success');
    } else if (type === 'fail') {
        p.classList.add('log-fail');
    }
    logElement.prepend(p); // Add to top
    if (logElement.children.length > 5) { // Keep only last 5 logs
        logElement.removeChild(logElement.lastChild);
    }
}

// ฟังก์ชันสำหรับ Enchant (Base Enchant)
function handleBaseEnchant(slotNum) {
    const selectedOption = baseEnchantSelects[slotNum].value;
    if (!selectedOption) {
        alert("กรุณาเลือกออฟชั่นที่ต้องการ Enchant!");
        return;
    }

    if (enchantSlots[slotNum].level > 0) {
        alert("สล็อตนี้มีออฟชั่นอยู่แล้ว! หากต้องการเปลี่ยนต้อง Reset ก่อน");
        return;
    }

    // เพิ่มค่าใช้จ่าย
    totalResources.temporalSpell += BASE_ENCHANT_COST.temporalSpell;
    totalResources.temporalGemstone += BASE_ENCHANT_COST.temporalGemstone;
    totalResources.zeny += BASE_ENCHANT_COST.zeny;
    totalResources.silvervine += BASE_ENCHANT_COST.silvervine; // ซึ่งจะเป็น 0

    // อัปเดตสถานะสล็อต
    enchantSlots[slotNum].name = selectedOption;
    enchantSlots[slotNum].level = 1; // Base Enchant คือ Lv.1

    updateEnchantDisplay(slotNum);
    updateTotalResourcesDisplay();
}

// ฟังก์ชันสำหรับ Enchant Spirit of Knight (เฉพาะ Slot 2)
function handleKnightEnchant() {
    const slotNum = 2; // Spirit of Knight เฉพาะ Slot 2
    if (enchantSlots[slotNum].level > 0) {
        alert("สล็อตนี้มีออฟชั่นอยู่แล้ว! หากต้องการเปลี่ยนต้อง Reset ก่อน");
        return;
    }

    // เพิ่มค่าใช้จ่าย
    totalResources.temporalSpell += KNIGHT_ENCHANT_COST.temporalSpell;
    totalResources.temporalGemstone += KNIGHT_ENCHANT_COST.temporalGemstone;
    totalResources.zeny += KNIGHT_ENCHANT_COST.zeny;
    totalResources.silvervine += KNIGHT_ENCHANT_COST.silvervine;

    // อัปเดตสถานะสล็อต
    enchantSlots[slotNum].name = "Spirit of Knight";
    enchantSlots[slotNum].level = 1; // Base Enchant คือ Lv.1

    updateEnchantDisplay(slotNum);
    updateTotalResourcesDisplay();
}

// ฟังก์ชันสำหรับ Upgrade Enchant
function handleUpgradeEnchant(slotNum) {
    const slot = enchantSlots[slotNum];
    if (slot.level === 0) {
        alert("สล็อตนี้ยังไม่มีออฟชั่น กรุณา Enchant ก่อน!");
        return;
    }

    let upgradeData = UPGRADE_DATA;
    let maxLevel = 5;

    if (slot.name === "Spirit of Knight") {
        upgradeData = KNIGHT_UPGRADE_DATA;
        maxLevel = 7;
    }

    if (slot.level >= maxLevel) {
        alert("ออฟชั่นนี้ถึงระดับสูงสุดแล้ว!");
        return;
    }

    const currentLevel = slot.level;
    const upgradeInfo = upgradeData[currentLevel]; // ใช้ currentLevel เพราะข้อมูลใน UPGRADE_DATA คือระดับที่ต้องการอัปเกรดไปถึง

    if (!upgradeInfo) {
        alert("ไม่พบข้อมูลการอัปเกรดสำหรับออฟชั่นและระดับนี้!");
        return;
    }

    // เพิ่มค่าใช้จ่าย
    totalResources.temporalSpell += upgradeInfo.spell;
    totalResources.temporalGemstone += upgradeInfo.gemstone;
    totalResources.zeny += upgradeInfo.zeny;

    // จำลองโอกาสสำเร็จ
    const isSuccess = Math.random() * 100 < upgradeInfo.successRate;

    if (isSuccess) {
        slot.level++;
        logUpgrade(slotNum, `อัปเกรด ${slot.name} เป็น ${slot.level}Lv สำเร็จ!`, 'success');
    } else {
        // ลดระดับลง 1 ขั้น แต่ไม่ต่ำกว่า Base Enchant (level 1)
        if (slot.level > 1) {
            slot.level--;
            logUpgrade(slotNum, `อัปเกรด ${slot.name} ล้มเหลว! ระดับลดลงเหลือ ${slot.level}Lv`, 'fail');
        } else {
            logUpgrade(slotNum, `อัปเกรด ${slot.name} ล้มเหลว! ระดับไม่เปลี่ยนแปลง (อยู่ที่ Base Enchant)`, 'fail');
        }
    }

    updateEnchantDisplay(slotNum);
    updateTotalResourcesDisplay();
}

// ฟังก์ชันสำหรับ Reset Enchant ทั้งหมด (เฉพาะออฟชั่นบนไอเทม)
function resetAllEnchant() {
    // ตรวจสอบว่ามีออฟชั่นในสล็อต 2, 3, 4 อย่างน้อยหนึ่งช่องหรือไม่
    const hasAnyEnchant = enchantSlots[2].level > 0 || enchantSlots[3].level > 0 || enchantSlots[4].level > 0;

    if (!hasAnyEnchant) {
        alert("ไม่สามารถ Reset Enchant ทั้งหมดได้: ไม่มีออฟชั่นใดๆ ที่ถูก Enchant อยู่!");
        return; // หยุดการทำงานของฟังก์ชัน
    }

    if (confirm("คุณแน่ใจหรือไม่ที่จะ Reset Enchant ทั้งหมด? จะใช้ Silvervine 20ea")) {
        totalResources.silvervine += 20;
        for (const slotNum in enchantSlots) {
            enchantSlots[slotNum] = { name: "", level: 0 };
            updateEnchantDisplay(parseInt(slotNum));
        }
        updateTotalResourcesDisplay();
        alert("Reset Enchant ทั้งหมดเรียบร้อยแล้ว!");
    }
}

// ฟังก์ชันสำหรับ Reset Enchant Slot 2
function resetSlot2Enchant() {
    const slotNum = 2;
    // ตรวจสอบว่า Slot 2 มีออฟชั่นอยู่หรือไม่
    if (enchantSlots[slotNum].level === 0) {
        alert("ไม่สามารถ Reset Enchant Slot 2 ได้: สล็อต 2 ยังว่างเปล่าอยู่!");
        return; // หยุดการทำงานของฟังก์ชัน
    }

    if (confirm("คุณแน่ใจหรือไม่ที่จะ Reset Enchant Slot 2? จะใช้ Silvervine 50ea")) {
        totalResources.silvervine += 50;
        enchantSlots[slotNum] = { name: "", level: 0 };
        updateEnchantDisplay(parseInt(slotNum));
        updateTotalResourcesDisplay();
        alert("Reset Enchant Slot 2 เรียบร้อยแล้ว!");
    }
}

// ฟังก์ชันสำหรับ Reset ทั้งหมดและเริ่มต้นใหม่ (รวมทรัพยากร)
function restartSimulation() {
    // ตรวจสอบว่ามีออฟชั่นในสล็อตใดๆ หรือไม่ ก่อนที่จะอนุญาตให้รีเซ็ตทั้งหมด
    const hasAnyEnchant = enchantSlots[2].level > 0 || enchantSlots[3].level > 0 || enchantSlots[4].level > 0;
    if (!hasAnyEnchant && totalResources.temporalSpell === 0 && totalResources.temporalGemstone === 0 && totalResources.silvervine === 0 && totalResources.zeny === 0) {
        alert("ไม่สามารถเริ่มการจำลองใหม่ได้: ไม่มีออฟชั่นใดๆ ถูก Enchant หรือทรัพยากรที่ใช้ไป!");
        return;
    }

    if (confirm("คุณแน่ใจหรือไม่ที่จะเริ่มการจำลองใหม่ทั้งหมด? ข้อมูลการ Enchant และทรัพยากรที่ใช้ไปจะถูกล้าง")) {
        // รีเซ็ตทรัพยากรทั้งหมด
        totalResources = {
            temporalSpell: 0,
            temporalGemstone: 0,
            silvervine: 0,
            zeny: 0
        };

        // รีเซ็ตสถานะ Enchant ในทุกสล็อต
        for (const slotNum in enchantSlots) {
            enchantSlots[slotNum] = { name: "", level: 0 };
            updateEnchantDisplay(parseInt(slotNum)); // อัปเดต UI ของแต่ละสล็อต
            // ล้าง log การอัปเกรดของแต่ละสล็อต
            if(upgradeLogDisplay[slotNum]) {
                upgradeLogDisplay[slotNum].innerHTML = '';
            }
        }
        
        // อัปเดตการแสดงผลทรัพยากร
        updateTotalResourcesDisplay();

        // แจ้งผู้ใช้
        alert("การจำลองเริ่มต้นใหม่เรียบร้อยแล้ว!");
    }
}

// ฟังก์ชันสำหรับอัปเดตสถานะปุ่ม Reset
function updateResetButtonStates() {
    const hasAnyEnchant = enchantSlots[2].level > 0 || enchantSlots[3].level > 0 || enchantSlots[4].level > 0;

    // สำหรับปุ่ม resetAllEnchantButton
    if (resetAllEnchantButton) {
        resetAllEnchantButton.disabled = !hasAnyEnchant;
        resetAllEnchantButton.title = hasAnyEnchant ? "" : "ไม่มีออฟชั่นใดๆ ที่ถูก Enchant อยู่";
    }

    // สำหรับปุ่ม resetSlot2EnchantButton
    if (resetSlot2EnchantButton) {
        const hasEnchantInSlot2 = enchantSlots[2].level > 0;
        resetSlot2EnchantButton.disabled = !hasEnchantInSlot2;
        resetSlot2EnchantButton.title = hasEnchantInSlot2 ? "" : "สล็อต 2 ยังว่างเปล่าอยู่";
    }
    
    // สำหรับปุ่ม restartSimulationButton (รีเซ็ตทั้งหมดรวมทรัพยากร)
    // ปุ่มนี้จะถูกปิดใช้งานก็ต่อเมื่อไม่มีออฟชั่นใดๆ และทรัพยากรที่ใช้ไปเป็น 0 ทั้งหมด
    const totalSpentResources = totalResources.temporalSpell + totalResources.temporalGemstone + totalResources.silvervine + totalResources.zeny;
    restartSimulationButton.disabled = !hasAnyEnchant && totalSpentResources === 0;
    restartSimulationButton.title = (hasAnyEnchant || totalSpentResources > 0) ? "" : "ไม่มีออฟชั่นถูก Enchant และไม่มีทรัพยากรที่ใช้ไป";
}


document.addEventListener('DOMContentLoaded', () => {
    // ตั้งค่าชื่อและรูปไอเทม
    itemName.textContent = ITEM_NAME;
    itemImage.src = ITEM_IMAGE_URL;

    // แสดงค่าใช้จ่าย Base Enchant เริ่มต้น
    document.getElementById('base-enchant-4-cost').innerHTML = `
        <p><strong>ค่าใช้จ่าย:</strong></p>
        <p>Temporal Spell: ${BASE_ENCHANT_COST.temporalSpell} ea</p>
        <p>Temporal Gemstone: ${BASE_ENCHANT_COST.temporalGemstone} ea</p>
        <p>Zeny: ${formatNumber(BASE_ENCHANT_COST.zeny)}</p>
    `;
    document.getElementById('base-enchant-3-cost').innerHTML = `
        <p><strong>ค่าใช้จ่าย:</strong></p>
        <p>Temporal Spell: ${BASE_ENCHANT_COST.temporalSpell} ea</p>
        <p>Temporal Gemstone: ${BASE_ENCHANT_COST.temporalGemstone} ea</p>
        <p>Zeny: ${formatNumber(BASE_ENCHANT_COST.zeny)}</p>
    `;
    document.getElementById('base-enchant-2-cost').innerHTML = `
        <p><strong>ค่าใช้จ่าย:</strong></p>
        <p>Temporal Spell: ${BASE_ENCHANT_COST.temporalSpell} ea</p>
        <p>Temporal Gemstone: ${BASE_ENCHANT_COST.temporalGemstone} ea</p>
        <p>Zeny: ${formatNumber(BASE_ENCHANT_COST.zeny)}</p>
    `;

    // แสดงค่าใช้จ่าย Knight Enchant
    const knightEnchantCostDisplay = document.querySelector('#slot-2 .enchant-knight-button').nextElementSibling;
    knightEnchantCostDisplay.innerHTML += `
        <p><strong>สำหรับ Spirit of Knight Lv.1:</strong></p>
        <p>Temporal Spell: ${KNIGHT_ENCHANT_COST.temporalSpell} ea</p>
        <p>Temporal Gemstone: ${KNIGHT_ENCHANT_COST.temporalGemstone} ea</p>
        <p>Zeny: ${formatNumber(KNIGHT_ENCHANT_COST.zeny)}</p>
        <p>Silvervine: ${KNIGHT_ENCHANT_COST.silvervine} ea</p>
    `;

    // Event Listeners สำหรับ Base Enchant
    enchantButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const slotNum = event.target.dataset.slot;
            handleBaseEnchant(parseInt(slotNum));
        });
    });

    // Event Listener สำหรับ Spirit of Knight Enchant
    enchantKnightButton.addEventListener('click', () => {
        handleKnightEnchant();
    });

    // Event Listeners สำหรับ Upgrade Enchant
    upgradeButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const slotNum = event.target.dataset.slot;
            handleUpgradeEnchant(parseInt(slotNum));
        });
    });

    // Event Listeners สำหรับ Reset
    resetAllEnchantButton.addEventListener('click', resetAllEnchant);
    resetSlot2EnchantButton.addEventListener('click', resetSlot2Enchant);
    restartSimulationButton.addEventListener('click', restartSimulation); // เพิ่ม Event Listener สำหรับปุ่มเริ่มใหม่ทั้งหมด

    // อัปเดตการแสดงผลเริ่มต้น
    updateTotalResourcesDisplay();
    updateEnchantDisplay(4);
    updateEnchantDisplay(3);
    updateEnchantDisplay(2);
    updateResetButtonStates(); // เรียกใช้เพื่อตั้งค่าสถานะปุ่มเมื่อโหลดหน้า
});