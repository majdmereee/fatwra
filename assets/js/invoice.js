class InvoiceController {
    constructor() {
        this.rows = [];
        this.startTime = new Date();
        this.updateStartTimeUI();
    }

    formatTime(date) {
        let settings = StorageManager.getSettings();
        let options = { hour: '2-digit', minute: '2-digit' };
        if(settings.showSeconds) options.second = '2-digit';
        return date.toLocaleTimeString('ar-SY', options);
    }

    updateStartTimeUI() {
        document.getElementById('time-start').innerText = this.formatTime(this.startTime);
        document.getElementById('end-time-container').classList.add('hidden');
    }

    finalizeInvoiceTime() {
        let endTime = new Date();
        document.getElementById('end-time-container').classList.remove('hidden');
        document.getElementById('time-end').innerText = this.formatTime(endTime);
    }

    addItem(itemName) {
        const rowId = 'row_' + Date.now();
        this.rows.push({ id: rowId, name: itemName, amount: 0 });
        this.renderRow(rowId, itemName);
        StorageManager.incrementUsage(itemName);
    }

    renderRow(id, name) {
        const tbody = document.getElementById('invoice-body');
        const tr = document.createElement('tr');
        tr.id = id;
        tr.innerHTML = `
            <td>${name}</td>
            <td>
                <input type="number" class="amount-input" min="0" value="" placeholder="المبلغ..." 
                       oninput="app.invoice.updateAmount('${id}', this.value)">
            </td>
            <td class="no-print">
                <button class="btn-remove" onclick="app.invoice.removeRow('${id}')">✖</button>
            </td>
        `;
        tbody.appendChild(tr);
        // تركيز المؤشر تلقائياً على حقل الإدخال الجديد لسرعة العمل
        tr.querySelector('.amount-input').focus();
    }

    updateAmount(id, value) {
        let row = this.rows.find(r => r.id === id);
        if (row) {
            row.amount = parseFloat(value) || 0;
            this.calculateTotal();
        }
    }

    removeRow(id) {
        this.rows = this.rows.filter(r => r.id !== id);
        document.getElementById(id).remove();
        this.calculateTotal();
    }

    calculateTotal() {
        let total = this.rows.reduce((sum, row) => sum + row.amount, 0);
        document.getElementById('invoice-total').innerText = total.toLocaleString('ar-SY');
    }

    reset() {
        this.rows = [];
        document.getElementById('invoice-body').innerHTML = '';
        document.getElementById('invoice-total').innerText = '0';
        this.startTime = new Date();
        this.updateStartTimeUI();
        document.getElementById('time-end').innerText = '--:--:--';
    }
}
