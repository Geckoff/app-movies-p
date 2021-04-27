import { parse } from "querystring";

export const parseLocationQSParams = (paramsString: string) => {
    if (paramsString) {
        const noQuestionMarkString = paramsString.substring(1);
        return parse(noQuestionMarkString);
    }
    return null;
};
