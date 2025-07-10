document.addEventListener('DOMContentLoaded', () => {
    // Initial UI Elements
    const initialSelectionArea = document.getElementById('initial-selection');
    const itemSelectButtons = document.querySelectorAll('.item-select-button');
    const enchantSimulatorArea = document.getElementById('enchant-simulator-area');
    const selectedItemDisplay = document.getElementById('selected-item-display');

    // Simulator UI Elements
    const enchantCategorySelect = document.getElementById('enchant-category');
    const stoneSelectionContainer = document.getElementById('stone-selection-container');
    const enchantStoneSelect = document.getElementById('enchant-stone');
    const enchantButton = document.getElementById('enchant-button');
    const enchantResult = document.getElementById('enchant-result');
    const totalAttemptsElement = document.getElementById('total-attempts');
    const successCountElement = document.getElementById('success-count');
    const failCountElement = document.getElementById('fail-count');
    const resetButton = document.getElementById('reset-button');
    const backToItemSelectButton = document.getElementById('back-to-item-select');

    // Enchantment Data (Stone Names)
    const enchantStones = {
        job: {
            stones: ["Rune Knight 1", "Rune Knight 2", "Royal Guard 1", "Royal Guard 2", "Ranger 1","Ranger 2","Wanderer Minstrel 1","Wanderer Minstrel 2","ArchBishop 1","ArchBishop 2","Sura 1","Sura 2","Sorcerrer 1","Sorcerrer 2","Warlock 1","Warlock 2","Genetic 1","Genetic 2","Mechanic 1","Mechanic 2","Shadow Chaser 1","Shadow Chaser 2","Guillotine Cross 1","Guillotine Cross 2","Doram","Soul Reaper","Star Empror",]
        },
        effect: {
            stones: ["หินเอฟเฟค 1", "หินเอฟเฟค 2", "หินเอฟเฟค 3", "หินเอฟเฟค 4", "หินเอฟเฟค "]
        },
        loft: {
            stones: ["Loft Stone (STR)", "Loft Stone (AGI)", "Loft Stone (VIT)","Loft Stone (INT)","Loft Stone (DEX)","Loft Stone (LUK)","Loft Stone (Ultimate)"]
        }
    };

    // Simulation State
    let totalAttempts = 0;
    let successCount = 0;
    let failCount = 0;
    let currentSelectedItem = ''; // To store the type of item being enchanted

    // Track successful enchants per category
    const enchantedCategories = {
        job: false,
        effect: false,
        loft: false
    };

    // --- Functions ---

    // Update UI elements for stats
    function updateStatsUI() {
        totalAttemptsElement.textContent = `${totalAttempts} ครั้ง`;
        successCountElement.textContent = `${successCount} ครั้ง`;
        failCountElement.textContent = `${failCount} ครั้ง`;
    }

    // Populate the stone selection dropdown based on category
    function populateStoneOptions(category) {
        enchantStoneSelect.innerHTML = '<option value="">-- เลือกหิน --</option>'; // Reset options
        if (category && enchantStones.hasOwnProperty(category) && !enchantedCategories[category]) {
            enchantStones[category].stones.forEach(stone => {
                const option = document.createElement('option');
                option.value = stone;
                option.textContent = stone;
                enchantStoneSelect.appendChild(option);
            });
            stoneSelectionContainer.style.display = 'block'; // Show stone dropdown
        } else {
            stoneSelectionContainer.style.display = 'none'; // Hide if no category selected or already enchanted
        }
        enchantButton.disabled = true; // Disable button until stone is selected
        enchantResult.textContent = ''; // Clear previous result message
    }

    // Update the state of category selection and enchant button based on successful enchants
    function updateCategoryAndButtonStates() {
        // Disable categories that have been successfully enchanted
        Array.from(enchantCategorySelect.options).forEach(option => {
            if (option.value && enchantedCategories[option.value]) {
                option.disabled = true;
                // If the currently selected category is disabled, force selection to default
                if (enchantCategorySelect.value === option.value) {
                    enchantCategorySelect.value = '';
                    populateStoneOptions(''); // Reset stone options for new selection
                }
            } else {
                option.disabled = false;
            }
        });

        // Re-evaluate enchant button state
        const selectedCategory = enchantCategorySelect.value;
        const selectedStoneName = enchantStoneSelect.value;
        enchantButton.disabled = (!selectedCategory || !selectedStoneName || enchantedCategories[selectedCategory]);
    }

    // Handle Enchantment Logic
    function performEnchant() {
        const selectedCategory = enchantCategorySelect.value;
        const selectedStoneName = enchantStoneSelect.value;

        if (!selectedCategory || !selectedStoneName || enchantedCategories[selectedCategory]) {
            enchantResult.textContent = 'ไม่สามารถออฟได้: กรุณาเลือกหมวดหิน/หินออฟ หรือหมวดนี้ถูกออฟสำเร็จแล้ว';
            enchantResult.style.color = 'orange';
            return;
        }

        totalAttempts++;

        const success = Math.random() < 0.5; // 50% chance for success

        if (success) {
            successCount++;
            enchantResult.textContent = `🎉 การออฟ "${selectedStoneName}" สำเร็จ! 🎉`;
            enchantResult.style.color = '#2ecc71'; // Green for success
            
            // Mark this category as successfully enchanted
            enchantedCategories[selectedCategory] = true;
            updateCategoryAndButtonStates(); // Update UI to reflect disabled category
        } else {
            failCount++;
            enchantResult.textContent = `😭 การออฟ "${selectedStoneName}" ล้มเหลว... 😭`;
            enchantResult.style.color = '#e74c3c'; // Red for failure
        }
        updateStatsUI(); // Update display after each attempt
    }

    // Reset all statistics and states
    function resetSimulation() {
        totalAttempts = 0;
        successCount = 0;
        failCount = 0;

        // Reset enchanted categories
        for (const category in enchantedCategories) {
            enchantedCategories[category] = false;
        }

        enchantResult.textContent = ''; // Clear result message
        enchantCategorySelect.value = ''; // Reset category selection
        populateStoneOptions(''); // Hide and reset stone selection
        updateStatsUI(); // Update display to show zeros
        updateCategoryAndButtonStates(); // Re-enable all category options
    }

    // Function to show/hide sections
    function showSection(sectionId) {
        initialSelectionArea.style.display = 'none';
        enchantSimulatorArea.style.display = 'none';

        if (sectionId === 'initial') {
            initialSelectionArea.style.display = 'block';
        } else if (sectionId === 'simulator') {
            enchantSimulatorArea.style.display = 'block';
        }
    }

    // --- Event Listeners ---

    // Event listener for initial item selection buttons
    itemSelectButtons.forEach(button => {
        button.addEventListener('click', (event) => {
            currentSelectedItem = event.target.dataset.itemType;
            selectedItemDisplay.textContent = currentSelectedItem;
            resetSimulation(); // Reset simulation state when a new item is selected
            showSection('simulator');
        });
    });

    // Listen for changes in Enchant Category dropdown
    enchantCategorySelect.addEventListener('change', (event) => {
        const selectedCategory = event.target.value;
        populateStoneOptions(selectedCategory);
        updateCategoryAndButtonStates(); // Ensure button is correctly disabled/enabled
    });

    // Listen for changes in Enchant Stone dropdown to enable/disable button
    enchantStoneSelect.addEventListener('change', (event) => {
        const selectedCategory = enchantCategorySelect.value;
        enchantButton.disabled = event.target.value === '' || enchantedCategories[selectedCategory];
        enchantResult.textContent = ''; // Clear previous result message
    });

    // Listen for Enchant Button click
    enchantButton.addEventListener('click', performEnchant);

    // Listen for Reset Button click
    resetButton.addEventListener('click', resetSimulation);

    // Listen for Back to Item Select Button click
    backToItemSelectButton.addEventListener('click', () => {
        resetSimulation(); // Reset current simulation state
        showSection('initial');
    });

    // --- Initial Setup ---
    showSection('initial'); // Start by showing the initial item selection
    updateStatsUI(); // Initialize stats display to 0
    updateCategoryAndButtonStates(); // Set initial button and category states
});