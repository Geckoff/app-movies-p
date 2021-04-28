export const appendCssClass = (initialClasses: string, classesToAppend?: string) => {
    classesToAppend = typeof classesToAppend === "string" ? classesToAppend : "";
    return `${initialClasses} ${classesToAppend}`;
};
