// الأصناف الافتراضية المطلوبة
const DEFAULT_ITEMS = [
    'زيت', 'جاج', 'محارم', 'سفري', 'خضرة', 
    'بانزين', 'مخلل', 'غاز', 'امبيرات', 'مرعي', 
    'كولا', 'لبن', 'توم', 'مايونيز'
];

// بنية الإعدادات (نواة لاستيعاب 1000 ميزة)
const SYSTEM_FEATURES = {
    showInvoiceTitle: { label: "إظهار عنوان الفاتورة", type: "toggle", default: true },
    autoPrint: { label: "طباعة الفاتورة تلقائياً عند الإغلاق", type: "toggle", default: false },
    showSeconds: { label: "إظهار الثواني في الوقت", type: "toggle", default: true },
    darkMode: { label: "تفعيل الوضع الليلي للواجهة", type: "toggle", default: false },
    compactGrid: { label: "تصغير حجم الأزرار", type: "toggle", default: false },
    // يمكن إضافة مئات الإعدادات هنا مستقبلاً...
};
