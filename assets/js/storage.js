class StorageManager {
    static getItems() {
        let stored = localStorage.getItem('app_items');
        if (!stored) {
            // تهيئة العناصر بصفر استخدام
            let initItems = DEFAULT_ITEMS.map(name => ({ name: name, usageCount: 0 }));
            this.saveItems(initItems);
            return initItems;
        }
        return JSON.parse(stored);
    }

    static saveItems(itemsArray) {
        localStorage.setItem('app_items', JSON.stringify(itemsArray));
    }

    // خوارزمية ترتيب الأزرار حسب الأكثر استخداماً
    static getSortedItems() {
        let items = this.getItems();
        return items.sort((a, b) => b.usageCount - a.usageCount);
    }

    static incrementUsage(itemName) {
        let items = this.getItems();
        let target = items.find(i => i.name === itemName);
        if (target) {
            target.usageCount += 1;
            this.saveItems(items);
        }
    }

    static addNewItem(itemName) {
        let items = this.getItems();
        if (!items.find(i => i.name === itemName)) {
            items.push({ name: itemName, usageCount: 0 });
            this.saveItems(items);
            return true;
        }
        return false;
    }

    static getSettings() {
        let settings = localStorage.getItem('app_settings');
        return settings ? JSON.parse(settings) : this.getDefaultSettings();
    }

    static getDefaultSettings() {
        let defaults = {};
        for (let key in SYSTEM_FEATURES) {
            defaults[key] = SYSTEM_FEATURES[key].default;
        }
        return defaults;
    }

    static updateSetting(key, value) {
        let settings = this.getSettings();
        settings[key] = value;
        localStorage.setItem('app_settings', JSON.stringify(settings));
    }
}
