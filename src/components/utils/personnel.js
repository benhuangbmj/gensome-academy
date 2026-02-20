export default function personnel(efficiency = 1) {
    const personalItems = {}
    const fixedItems = {}
    return {
        get personnelEfficiency() {
            return efficiency;
        },
        set personnelEfficiency(value) {
            efficiency = value;
        },
        get personnelPersonalItems() {
            return personalItems;
        },
        get personnelFixedItems() {
            return fixedItems;
        },
    }
}