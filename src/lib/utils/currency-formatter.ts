export class CurrencyFormatter {
    static defaultDigits: number = 8;

    /**
     * Convert units into currency value with trimmed zeros
     */
    public static toString(units: number, digits?: number): string {
        if (digits === undefined || digits === null)
            digits = CurrencyFormatter.defaultDigits;

        if (units == null) return null;
        var waves = units / Math.pow(10, digits);
        var str = waves.toLocaleString("en-US", { minimumFractionDigits: digits });
        var parts = str.split(".")

        if (parts.length == 2) {
            if (parseInt(parts[1]) == 0) {
                parts[1] = ".0";
            } else { 
                parts[1] = "." + CurrencyFormatter.trimZeros(parts[1]);
            }
            return parts[0] + parts[1];
        }
        return parts[0];
    }
    
    private static trimZeros(str: string): string {
        if (str.length == 0 || str[str.length - 1] != "0")
            return str;
        return CurrencyFormatter.trimZeros(str.substring(0, str.length - 1))
    }
};