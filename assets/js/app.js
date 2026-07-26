class AppState {
    constructor() {
        this.invoice = new InvoiceController();
        this.init();
    }

    init() {
        this.renderButtons();
        this.setupEventListeners();
        this.buildSettingsPanel();
        this.applySettings();
    }

    // بناء شبكة الأزرار مع الفرز التلقائي
    renderButtons() {
        const grid = document.getElementById('items-grid');
        grid.innerHTML = ''; 
        const sortedItems = StorageManager.getSortedItems();
        
        sortedItems.forEach(item => {
            const btn = document.createElement('button');
            btn.className = 'item-btn';
            btn.innerText = item.name;
            btn.onclick = () => {
                this.invoice.addItem(item.name);
                // إعادة ترتيب الأزرار ببطء أو تركها للتحميل القادم للحفاظ على استقرار واجهة المستخدم
            };
            grid.appendChild(btn);
        });
    }

    setupEventListeners() {
        document.getElementById('btn-new').onclick = () => {
            this.invoice.reset();
            this.renderButtons(); // نحدث الترتيب مع كل فاتورة جديدة
        };

        document.getElementById('btn-print').onclick = () => {
            this.invoice.finalizeInvoiceTime();
            
            // تحويل الحقول المدخلة إلى نصوص قبل الطباعة لتجنب مشاكل التنسيق
            document.querySelectorAll('.amount-input').forEach(input => {
                input.setAttribute('value', input.value);
            });

            setTimeout(() => {
                window.print();
            }, 100); // تأخير بسيط لضمان تحديث الـ DOM وتثبيت وقت النهاية
        };

        // إضافة زر جديد
        document.getElementById('btn-add-custom').onclick = () => {
            let newItem = prompt('أدخل اسم الصنف الجديد:');
            if (newItem && newItem.trim() !== '') {
                if (StorageManager.addNewItem(newItem.trim())) {
                    this.renderButtons();
                } else {
                    alert('هذا الصنف موجود مسبقاً!');
                }
            }
        };

        // إدارة لوحة الإعدادات
        document.getElementById('btn-settings').onclick = () => {
            document.getElementById('settings-panel').classList.add('open');
        };
        document.getElementById('close-settings').onclick = () => {
            document.getElementById('settings-panel').classList.remove('open');
            this.renderButtons(); // تحديث الواجهة في حال تغيير الإعدادات
        };
    }

    // بناء قائمة الميزات (1000 ميزة ديناميكية)
    buildSettingsPanel() {
        const container = document.getElementById('settings-container');
        const currentSettings = StorageManager.getSettings();

        for (let key in SYSTEM_FEATURES) {
            let feature = SYSTEM_FEATURES[key];
            let row = document.createElement('div');
            row.className = 'setting-item';
            
            row.innerHTML = `
                <label>${feature.label}</label>
                <input type="checkbox" id="set_${key}" ${currentSettings[key] ? 'checked' : ''}>
            `;
            
            let checkbox = row.querySelector('input');
            checkbox.onchange = (e) => {
                StorageManager.updateSetting(key, e.target.checked);
                this.applySettings(); // تطبيق فوري
            };
            
            container.appendChild(row);
        }
    }

    // تطبيق تأثيرات الإعدادات على الواجهة
    applySettings() {
        let settings = StorageManager.getSettings();
        
        // عنوان الفاتورة
        document.getElementById('print-title').style.display = settings.showInvoiceTitle ? 'block' : 'none';
        
        // الوضع الليلي (Dark Mode)
        if (settings.darkMode) {
            document.documentElement.style.setProperty('--bg', '#111827');
            document.documentElement.style.setProperty('--panel-bg', '#1f2937');
            document.documentElement.style.setProperty('--text-main', '#f9fafb');
        } else {
            document.documentElement.style.setProperty('--bg', '#f3f4f6');
            document.documentElement.style.setProperty('--panel-bg', '#ffffff');
            document.documentElement.style.setProperty('--text-main', '#1f2937');
        }

        // تحديث الوقت إذا تم تغيير إعداد الثواني
        this.invoice.updateStartTimeUI();
    }
}

// تشغيل النظام بمجرد تحميل الصفحة
const app = new AppState();
