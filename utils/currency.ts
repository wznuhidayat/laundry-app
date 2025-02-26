export function currency(value,def = 'id-ID') {
    return new Intl.NumberFormat(def, { style: 'currency', currency: 'IDR',maximumFractionDigits: 0  }).format(value);
}
