// --- ข้อมูลเกม (ปรับแก้ได้ตามต้องการ) ---
const ITEM_NAME_LV2 = "Time Jewelry Amulet"; // ชื่อไอเทม Lv.2
const ITEM_IMAGE_URL_LV2 = "https://www.divine-pride.net/img/items/collection/thROG/490583"; // URL รูปไอเทม Lv.2
const ITEM_NAME_LV3 = "Time Jewelry Amulet"; // ชื่อไอเทม Lv.3
const ITEM_IMAGE_URL_LV3 = "https://www.divine-pride.net/img/items/collection/thROG/490584"; // URL รูปไอเทม Lv.3 (ตัวอย่าง)

// ข้อมูล Enchant สำหรับ Time Jewelry Amulet Lv.2
const ENCHANT_DATA_LV2 = {
    slot4: { // สุ่ม
        options: [
            "Expert Archer 5Lv", "Fighting Spirit 6Lv", "Spell 5Lv", "Sharp 4Lv", "Critical Lv.2",
            "Fighting Spirit 7Lv", "Sharp 5Lv", "Critical Lv.3", "Spell 4Lv", "Expert Archer 4Lv"
        ],
        cost: { temporalSpell: 2, zeny: 0, silvervine: 0, temporalGemstone: 0 },
        successRate: 100 // โอกาสติด 100%
    },
    slot3: { // เลือก (10%)
        options: [
            "Time Jewel (Str) Lv.2", "Time Jewel (Agi) Lv.2", "Time Jewel (Vit) Lv.2",
            "Time Jewel (Int) Lv.2", "Time Jewel (Dex) Lv.2", "Time Jewel (Luk) Lv.2"
        ],
        cost: { temporalSpell: 5, zeny: 0, silvervine: 0, temporalGemstone: 0 },
        successRate: 10 // โอกาสติด 10%
    }
};

// ข้อมูล Reset Enchant สำหรับ Time Jewelry Amulet Lv.2
const RESET_COST_LV2 = { silvervine: 1, zeny: 500000 };

// ข้อมูล Upgrade Item Lv.2 -> Lv.3
const UPGRADE_ITEM_COST = {
    temporalSpell: 10,
    temporalGemstone: 5,
    silvervine: 10,
    zeny: 0, // ไม่มีค่า Zeny ระบุไว้ในการอัปเกรดไอเท็ม
    successRate: 5 // โอกาสสำเร็จ 5%
};
const UPGRADE_ITEM_GUARANTEE_ITEM_NAME = "Time Jewelry Amulet Blessing"; // ชื่อไอเท็มการันตี

// ข้อมูล Enchant สำหรับ Time Jewelry Amulet Lv.3
const ENCHANT_DATA_LV3 = {
    slot4: { // สุ่ม
        options: [
            "Expert Archer 5Lv", "Fighting Spirit 6Lv", "Spell 5Lv", "Sharp 4Lv", "Critical Lv.2",
            "Fighting Spirit 7Lv", "Sharp 5Lv", "Critical Lv.3", "Spell 4Lv", "Expert Archer 4Lv"
        ],
        cost: { temporalSpell: 4, zeny: 0, silvervine: 0, temporalGemstone: 0 },
        successRate: 100 // โอกาสติด 100%
    },
    slot3: { // เลือก (4%)
        options: [
            "Time Jewel (Str) Lv.3", "Time Jewel (Agi) Lv.3", "Time Jewel (Vit) Lv.3",
            "Time Jewel (Int) Lv.3", "Time Jewel (Dex) Lv.3", "Time Jewel (Luk) Lv.3"
        ],
        cost: { temporalSpell: 10, zeny: 0, silvervine: 0, temporalGemstone: 0 },
        successRate: 4 // โอกาสติด 4%
    }
};

// ข้อมูล Reset Enchant สำหรับ Time Jewelry Amulet Lv.3
const RESET_COST_LV3 = { silvervine: 2, zeny: 1000000 };

// --- ตัวแปรสถานะเกม ---
let totalResources = {
    temporalSpell: 0,
    temporalGemstone: 0,
    silvervine: 0,
    zeny: 0,
    timeJewelryAmuletBlessing: 0 // เพิ่มทรัพยากร Time Jewelry Amulet Blessing
};

// สล็อตออฟชั่น (Slot 4 และ Slot 3)
let enchantSlots = {
    4: { name: "", level: 0 }, // level 0 = ว่าง, name คือข้อความออฟชั่น
    3: { name: "", level: 0 }
};

let currentItemLevel = 2; // สถานะเริ่มต้นของไอเท็ม: Lv.2

// --- DOM Elements ---
const itemImage = document.getElementById('item-image');
const itemName = document.getElementById('item-name');
const currentItemLevelDisplay = document.getElementById('current-item-level-display');
const itemLevelText = document.getElementById('item-level-text');

const enchantDisplay = {
    4: document.getElementById('enchant-4-display'),
    3: document.getElementById('enchant-3-display')
};

const baseEnchantSections = {
    4: document.getElementById('base-enchant-4-section'),
    3: document.getElementById('base-enchant-3-section')
};

const baseEnchantSelects = {
    3: document.getElementById('base-enchant-3-select') // Slot 4 ไม่มี select แล้ว
};

const enchantButtons = document.querySelectorAll('.enchant-button');

const baseEnchantCostDisplay = {
    4: document.getElementById('base-enchant-4-cost'),
    3: document.getElementById('base-enchant-3-cost')
};

const upgradeLogDisplay = {
    4: document.getElementById('upgrade-4-log'),
    3: document.getElementById('upgrade-3-log'),
    item: document.getElementById('item-upgrade-log') // สำหรับ log การอัปเกรดไอเท็ม
};

const totalTemporalSpell = document.getElementById('total-temporal-spell');
const totalTemporalGemstone = document.getElementById('total-temporal-gemstone');
const totalSilvervine = document.getElementById('total-silvervine');
const totalZeny = document.getElementById('total-zeny');
const totalTimeJewelryAmuletBlessing = document.getElementById('total-time-jewelry-amulet-blessing'); // เพิ่ม DOM element สำหรับ Blessing

const resetAllEnchantButton = document.getElementById('reset-all-enchant');
const restartSimulationButton = document.getElementById('restart-simulation');

// DOM Elements สำหรับการอัปเกรดไอเท็ม
const itemUpgradeSection = document.getElementById('item-upgrade-section');
const upgradeItemNormalButton = document.getElementById('upgrade-item-normal-button');
const upgradeItemGuaranteeButton = document.getElementById('upgrade-item-guarantee-button');
const upgradeItemCostDisplay = document.getElementById('upgrade-item-cost-display');


// --- ฟังก์ชันช่วยเหลือ ---
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function logMessage(logElement, message, type = 'info') {
    const p = document.createElement('p');
    p.textContent = message;
    if (type === 'success') {
        p.classList.add('log-success');
    } else if (type === 'fail') {
        p.classList.add('log-fail');
    }
    logElement.prepend(p);
    // Keep only last 5 logs for cleaner display
    if (logElement.children.length > 5) {
        logElement.removeChild(logElement.lastChild);
    }
}

function updateTotalResourcesDisplay() {
    totalTemporalSpell.textContent = formatNumber(totalResources.temporalSpell);
    totalTemporalGemstone.textContent = formatNumber(totalResources.temporalGemstone);
    totalSilvervine.textContent = formatNumber(totalResources.silvervine);
    totalZeny.textContent = formatNumber(totalResources.zeny);
    totalTimeJewelryAmuletBlessing.textContent = formatNumber(totalResources.timeJewelryAmuletBlessing); // อัปเดตการแสดงผล Blessing
}

// --- ฟังก์ชันหลักในการจัดการ UI และ Logic ---

// ฟังก์ชันอัปเดต UI ของสล็อตตามระดับไอเท็มและสถานะ Enchant
function updateSlotUI(slotNum) {
    const slot = enchantSlots[slotNum];
    const displayElement = enchantDisplay[slotNum];
    const baseSection = baseEnchantSections[slotNum];
    const costDisplayElement = baseEnchantCostDisplay[slotNum];
    const enchantBtn = baseEnchantSections[slotNum].querySelector('.enchant-button');
    const currentEnchantData = (currentItemLevel === 2) ? ENCHANT_DATA_LV2 : ENCHANT_DATA_LV3;
    const enchantInfo = currentEnchantData[`slot${slotNum}`];

    // ล้าง log ก่อนอัปเดต UI ของสล็อต
    upgradeLogDisplay[slotNum].innerHTML = '';

    // สำหรับ Slot 3 (เลือกได้)
    if (slotNum === 3) {
        const selectElement = baseEnchantSelects[slotNum];
        selectElement.innerHTML = '<option value="">-- เลือกออฟชั่น --</option>';
        enchantInfo.options.forEach(option => {
            const opt = document.createElement('option');
            opt.value = option;
            opt.textContent = option;
            selectElement.appendChild(opt);
        });
        selectElement.style.display = 'block'; // ให้ select box แสดง
    } else { // สำหรับ Slot 4 (สุ่ม)
        // ไม่มี select box
        const selectElement = baseEnchantSections[slotNum].querySelector('select'); // ลองหาเผื่อมี
        if(selectElement) selectElement.style.display = 'none'; // ซ่อน select box ถ้ามี
    }

    // อัปเดตค่าใช้จ่ายพื้นฐาน
    const cost = enchantInfo.cost;
    costDisplayElement.innerHTML = `
        <p><strong>ค่าใช้จ่าย:</strong></p>
        <p>Temporal Spell: ${cost.temporalSpell} ea</p>
        ${cost.temporalGemstone > 0 ? `<p>Temporal Gemstone: ${cost.temporalGemstone} ea</p>` : ''}
        ${cost.silvervine > 0 ? `<p>Silvervine: ${cost.silvervine} ea</p>` : ''}
        ${cost.zeny > 0 ? `<p>Zeny: ${formatNumber(cost.zeny)}</p>` : ''}
        <p>โอกาสสำเร็จ: ${enchantInfo.successRate}%</p>
    `;

    // แสดงสถานะของสล็อต
    if (slot.level === 0) { // ว่าง
        displayElement.textContent = "ว่าง";
        baseSection.style.display = 'block'; // แสดงส่วน Base Enchant
        enchantBtn.disabled = false;
    } else { // มีออฟชั่นแล้ว
        displayElement.textContent = slot.name; // แสดงชื่อออฟชั่นที่ติด
        baseSection.style.display = 'none'; // ซ่อนส่วน Base Enchant
        enchantBtn.disabled = true; // Enchant ไม่ได้แล้ว
    }
    updateResetButtonStates(); // อัปเดตสถานะปุ่ม Reset
}

// ฟังก์ชันสำหรับ Enchant (Base Enchant)
function handleEnchant(slotNum) {
    let selectedOption;
    if (slotNum === 3) { // Slot 3 เป็นแบบเลือก
        selectedOption = baseEnchantSelects[slotNum].value;
        if (!selectedOption) {
            alert("กรุณาเลือกออฟชั่นที่ต้องการ Enchant!");
            return;
        }
    }

    if (enchantSlots[slotNum].level > 0) {
        alert("สล็อตนี้มีออฟชั่นอยู่แล้ว! หากต้องการเปลี่ยนต้อง Reset ก่อน");
        return;
    }

    const currentEnchantData = (currentItemLevel === 2) ? ENCHANT_DATA_LV2 : ENCHANT_DATA_LV3;
    const enchantInfo = currentEnchantData[`slot${slotNum}`];

    // ถ้าเป็น Slot 4 (สุ่ม) ให้สุ่มออฟชั่นจาก options list
    if (slotNum === 4) {
        const randomIndex = Math.floor(Math.random() * enchantInfo.options.length);
        selectedOption = enchantInfo.options[randomIndex];
    }

    // เพิ่มค่าใช้จ่าย
    totalResources.temporalSpell += enchantInfo.cost.temporalSpell;
    totalResources.temporalGemstone += enchantInfo.cost.temporalGemstone;
    totalResources.zeny += enchantInfo.cost.zeny;
    totalResources.silvervine += enchantInfo.cost.silvervine;

    // จำลองโอกาสสำเร็จ
    const isSuccess = Math.random() * 100 < enchantInfo.successRate;

    if (isSuccess) {
        enchantSlots[slotNum].name = selectedOption;
        enchantSlots[slotNum].level = 1; // นับว่ามีออฟชั่นแล้ว
        alert(`Enchant ${selectedOption} สำเร็จ!`); // เพิ่ม alert
        logMessage(upgradeLogDisplay[slotNum], `Enchant ${selectedOption} สำเร็จ!`, 'success');
    } else {
        alert(`Enchant ${selectedOption} ล้มเหลว!`); // เพิ่ม alert
        logMessage(upgradeLogDisplay[slotNum], `Enchant ${selectedOption} ล้มเหลว!`, 'fail');
        // ออฟชั่นไม่ติด, สล็อตยังคงว่าง
        enchantSlots[slotNum].name = "";
        enchantSlots[slotNum].level = 0;
    }

    updateSlotUI(slotNum);
    updateTotalResourcesDisplay();
}

// ฟังก์ชันสำหรับ Reset Enchant
function resetEnchant(slotNum) {
    const costData = (currentItemLevel === 2) ? RESET_COST_LV2 : RESET_COST_LV3;

    if (enchantSlots[slotNum].level === 0) {
        alert(`ไม่สามารถ Reset Enchant Slot ${slotNum} ได้: สล็อตยังว่างเปล่าอยู่!`);
        return;
    }

    if (confirm(`คุณแน่ใจหรือไม่ที่จะ Reset Enchant Slot ${slotNum}? จะใช้ Silvervine ${costData.silvervine}ea และ Zeny ${formatNumber(costData.zeny)}`)) {
        totalResources.silvervine += costData.silvervine;
        totalResources.zeny += costData.zeny;

        enchantSlots[slotNum] = { name: "", level: 0 };
        updateSlotUI(slotNum);
        updateTotalResourcesDisplay();
        alert(`Reset Enchant Slot ${slotNum} เรียบร้อยแล้ว!`); // เพิ่ม alert
        logMessage(upgradeLogDisplay[slotNum], `Reset Enchant Slot ${slotNum} เรียบร้อยแล้ว!`, 'info');
    }
}

// ฟังก์ชันสำหรับ Reset Enchant ทั้งหมดในทุกสล็อต
function resetAllEnchant() {
    const hasAnyEnchant = enchantSlots[4].level > 0 || enchantSlots[3].level > 0;
    const costData = (currentItemLevel === 2) ? RESET_COST_LV2 : RESET_COST_LV3;

    if (!hasAnyEnchant) {
        alert("ไม่สามารถ Reset Enchant ทั้งหมดได้: ไม่มีออฟชั่นใดๆ ที่ถูก Enchant อยู่!");
        return;
    }

    if (confirm(`คุณแน่ใจหรือไม่ที่จะ Reset Enchant ทั้งหมด? จะใช้ Silvervine ${costData.silvervine}ea และ Zeny ${formatNumber(costData.zeny)}`)) {
        totalResources.silvervine += costData.silvervine;
        totalResources.zeny += costData.zeny;

        for (const slotNum in enchantSlots) {
            enchantSlots[slotNum] = { name: "", level: 0 };
            updateSlotUI(parseInt(slotNum));
        }
        updateTotalResourcesDisplay();
        alert("Reset Enchant ทั้งหมดเรียบร้อยแล้ว!"); // เพิ่ม alert
    }
}


// ฟังก์ชันสำหรับอัปเกรดไอเท็ม Lv.2 -> Lv.3 (แบบปกติ)
function upgradeItemNormal() {
    if (currentItemLevel === 3) {
        alert("ไอเท็มอยู่ในระดับ Lv.3 อยู่แล้ว!");
        return;
    }

    // ตรวจสอบว่ามีออฟชั่นหรือการ์ดอยู่หรือไม่ (ตามเงื่อนไขที่ผู้ใช้ให้มา)
    const hasEnchants = enchantSlots[4].level > 0 || enchantSlots[3].level > 0;
    let confirmMessage = `คุณแน่ใจหรือไม่ที่จะอัปเกรด Time Jewelry Amulet Lv.2 เป็น Lv.3? จะใช้ Temporal Spell ${UPGRADE_ITEM_COST.temporalSpell}ea, Temporal Gemstone ${UPGRADE_ITEM_COST.temporalGemstone}ea, Silvervine ${UPGRADE_ITEM_COST.silvervine}ea และมีโอกาสสำเร็จเพียง ${UPGRADE_ITEM_COST.successRate}%`;
    
    if (hasEnchants) {
        confirmMessage = "คำเตือน: ไอเท็มมี Option อยู่! หากอัปเกรด Option ทั้งหมดพร้อม Card (ถ้ามี) จะสูญหายไป\n\n" + confirmMessage;
    }

    if (!confirm(confirmMessage)) {
        return;
    }


    // เพิ่มค่าใช้จ่าย
    totalResources.temporalSpell += UPGRADE_ITEM_COST.temporalSpell;
    totalResources.temporalGemstone += UPGRADE_ITEM_COST.temporalGemstone;
    totalResources.silvervine += UPGRADE_ITEM_COST.silvervine;
    // ไม่มี Zeny สำหรับอัปเกรดไอเท็ม

    // จำลองโอกาสสำเร็จ
    const isSuccess = Math.random() * 100 < UPGRADE_ITEM_COST.successRate;

    if (isSuccess) {
        currentItemLevel = 3; // อัปเดตระดับไอเท็ม
        // ล้างออฟชั่นทั้งหมดเมื่ออัปเกรดสำเร็จ (ตามเงื่อนไข)
        for (const slotNum in enchantSlots) {
            enchantSlots[slotNum] = { name: "", level: 0 };
        }
        logMessage(upgradeLogDisplay.item, `อัปเกรด Time Jewelry Amulet เป็น Lv.3 สำเร็จ! (ออฟชั่นเก่าถูกลบ)`, 'success');
        updateItemLevelUI(); // อัปเดต UI ที่เกี่ยวข้องกับระดับไอเท็ม
    } else {
        logMessage(upgradeLogDisplay.item, `อัปเกรด Time Jewelry Amulet Lv.2 เป็น Lv.3 ล้มเหลว!`, 'fail');
        // ไม่สูญเสียไอเท็ม แต่สูญเสียวัตถุดิบไปแล้ว
    }
    updateTotalResourcesDisplay();
    updateResetButtonStates();
}

// ฟังก์ชันสำหรับอัปเกรดไอเท็ม Lv.2 -> Lv.3 (แบบการันตี)
function upgradeItemGuarantee() {
    if (currentItemLevel === 3) {
        alert("ไอเท็มอยู่ในระดับ Lv.3 อยู่แล้ว!");
        return;
    }

    // ตรวจสอบว่ามีออฟชั่นหรือการ์ดอยู่หรือไม่ (ตามเงื่อนไขที่ผู้ใช้ให้มา)
    const hasEnchants = enchantSlots[4].level > 0 || enchantSlots[3].level > 0;
    let confirmMessage = `คุณแน่ใจหรือไม่ที่จะใช้ ${UPGRADE_ITEM_GUARANTEE_ITEM_NAME} เพื่อการันตีอัปเกรด Time Jewelry Amulet Lv.2 เป็น Lv.3?`;
    
    if (hasEnchants) {
        confirmMessage = "คำเตือน: ไอเท็มมี Option อยู่! หากอัปเกรด Option ทั้งหมดพร้อม Card (ถ้ามี) จะสูญหายไป\n\n" + confirmMessage;
    }

    if (!confirm(confirmMessage)) {
        return;
    }

    // เพิ่มการนับ Time Jewelry Amulet Blessing ที่นี่
    totalResources.timeJewelryAmuletBlessing += 1;

    currentItemLevel = 3; // อัปเดตระดับไอเท็มทันที
    // ล้างออฟชั่นทั้งหมดเมื่ออัปเกรดสำเร็จ (ตามเงื่อนไข)
    for (const slotNum in enchantSlots) {
        enchantSlots[slotNum] = { name: "", level: 0 };
    }
    logMessage(upgradeLogDisplay.item, `ใช้ ${UPGRADE_ITEM_GUARANTEE_ITEM_NAME} การันตีอัปเกรด Time Jewelry Amulet เป็น Lv.3 สำเร็จ! (ออฟชั่นเก่าถูกลบ)`, 'success');
    updateItemLevelUI(); // อัปเดต UI ที่เกี่ยวข้องกับระดับไอเท็ม
    updateTotalResourcesDisplay(); // อัปเดต UI ทรัพยากร
    updateResetButtonStates();
}

// ฟังก์ชันสำหรับอัปเดต UI เมื่อระดับไอเท็มเปลี่ยน
function updateItemLevelUI() {
    itemLevelText.textContent = `Lv.${currentItemLevel}`;
    currentItemLevelDisplay.textContent = `(Lv.${currentItemLevel})`;

    if (currentItemLevel === 2) {
        itemImage.src = ITEM_IMAGE_URL_LV2;
        itemName.textContent = ITEM_NAME_LV2;
        itemUpgradeSection.style.display = 'block'; // แสดงส่วนอัปเกรดไอเท็ม
    } else { // currentItemLevel === 3
        itemImage.src = ITEM_IMAGE_URL_LV3;
        itemName.textContent = ITEM_NAME_LV3;
        itemUpgradeSection.style.display = 'none'; // ซ่อนส่วนอัปเกรดไอเท็ม
    }

    // อัปเดต UI ของแต่ละสล็อตให้ตรงกับระดับไอเท็มใหม่
    updateSlotUI(4);
    updateSlotUI(3);
}


// ฟังก์ชันสำหรับ Reset ทั้งหมดและเริ่มต้นใหม่ (รวมทรัพยากร)
function restartSimulation() {
    const hasAnyEnchant = enchantSlots[4].level > 0 || enchantSlots[3].level > 0;
    const totalSpentResourcesSum = totalResources.temporalSpell + totalResources.temporalGemstone + totalResources.silvervine + totalResources.zeny + totalResources.timeJewelryAmuletBlessing; // รวม Blessing ด้วย

    // ตรวจสอบเพิ่มเติมว่ามีการอัปเกรดไอเท็มไปแล้วหรือไม่
    const hasItemUpgraded = currentItemLevel === 3;

    if (!hasAnyEnchant && totalSpentResourcesSum === 0 && !hasItemUpgraded) {
        alert("ไม่สามารถเริ่มการจำลองใหม่ได้: ไม่มีออฟชั่นใดๆ ถูก Enchant, ไม่มีทรัพยากรที่ใช้ไป หรือไอเท็มยังไม่ได้ถูกอัปเกรด!");
        return;
    }

    if (confirm("คุณแน่ใจหรือไม่ที่จะเริ่มการจำลองใหม่ทั้งหมด? ข้อมูลการ Enchant, ทรัพยากรที่ใช้ไป และระดับไอเท็มจะถูกล้าง")) {
        totalResources = {
            temporalSpell: 0,
            temporalGemstone: 0,
            silvervine: 0,
            zeny: 0,
            timeJewelryAmuletBlessing: 0 // รีเซ็ต Blessing ด้วย
        };

        enchantSlots = {
            4: { name: "", level: 0 },
            3: { name: "", level: 0 }
        };
        
        currentItemLevel = 2; // รีเซ็ตระดับไอเท็มกลับเป็น Lv.2

        updateItemLevelUI(); // อัปเดต UI ระดับไอเท็ม

        // ล้าง log การอัปเกรดของแต่ละสล็อตและ log ของไอเท็ม
        upgradeLogDisplay[4].innerHTML = '';
        upgradeLogDisplay[3].innerHTML = '';
        upgradeLogDisplay.item.innerHTML = '';
        
        updateTotalResourcesDisplay();
        updateResetButtonStates();
        alert("การจำลองเริ่มต้นใหม่เรียบร้อยแล้ว!");
    }
}

// ฟังก์ชันสำหรับอัปเดตสถานะปุ่ม Reset และ Upgrade
function updateResetButtonStates() {
    const hasAnyEnchant = enchantSlots[4].level > 0 || enchantSlots[3].level > 0;

    // ปุ่ม Reset Enchant ทั้งหมด
    resetAllEnchantButton.disabled = !hasAnyEnchant;
    resetAllEnchantButton.title = hasAnyEnchant ? "" : "ไม่มีออฟชั่นใดๆ ที่ถูก Enchant อยู่";

    // ปุ่ม Enchant ในแต่ละสล็อต
    // Enchant ได้เฉพาะเมื่อสล็อตว่าง
    baseEnchantSections[4].querySelector('.enchant-button').disabled = enchantSlots[4].level > 0;
    // สำหรับ Slot 3 ต้องตรวจสอบ baseEnchantSelects[3] ด้วย
    baseEnchantSections[3].querySelector('.enchant-button').disabled = enchantSlots[3].level > 0;

    // ปุ่ม Upgrade Item
    upgradeItemNormalButton.disabled = currentItemLevel === 3;
    upgradeItemNormalButton.title = currentItemLevel === 3 ? "ไอเท็มอยู่ในระดับสูงสุดแล้ว" : "";
    upgradeItemGuaranteeButton.disabled = currentItemLevel === 3;
    upgradeItemGuaranteeButton.title = currentItemLevel === 3 ? "ไอเท็มอยู่ในระดับสูงสุดแล้ว" : "";

    // ปุ่ม Restart Simulation
    const totalSpentResourcesSum = totalResources.temporalSpell + totalResources.temporalGemstone + totalResources.silvervine + totalResources.zeny + totalResources.timeJewelryAmuletBlessing; // รวม Blessing ด้วย
    const hasItemUpgraded = currentItemLevel === 3;
    restartSimulationButton.disabled = !hasAnyEnchant && totalSpentResourcesSum === 0 && !hasItemUpgraded;
    restartSimulationButton.title = (hasAnyEnchant || totalSpentResourcesSum > 0 || hasItemUpgraded) ? "" : "ไม่มีการกระทำใดๆ เพื่อรีเซ็ต";
}


// --- Event Listeners และการเริ่มต้น ---
document.addEventListener('DOMContentLoaded', () => {
    // กำหนดค่าเริ่มต้นของ UI ตามระดับไอเท็มปัจจุบัน
    updateItemLevelUI();

    // Event Listeners สำหรับ Enchant แต่ละสล็อต
    enchantButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            const slotNum = parseInt(event.target.dataset.slot);
            handleEnchant(slotNum);
        });
    });
    
    // Event Listeners สำหรับการอัปเกรดไอเท็ม
    upgradeItemNormalButton.addEventListener('click', upgradeItemNormal);
    upgradeItemGuaranteeButton.addEventListener('click', upgradeItemGuarantee);

    // Event Listeners สำหรับ Reset ทั้งหมด
    resetAllEnchantButton.addEventListener('click', resetAllEnchant);
    restartSimulationButton.addEventListener('click', restartSimulation);

    // อัปเดต UI ทั้งหมดเมื่อโหลดหน้าครั้งแรก
    updateTotalResourcesDisplay();
    updateResetButtonStates();
});