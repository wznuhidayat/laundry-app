import { customRound } from "./rounding";
export function discountLabel(type,value) {
    return type === 'percentage' ? `${value}%` : customRound(value);
}