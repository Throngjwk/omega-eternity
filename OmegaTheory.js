import { ExponentialCost, FreeCost, LinearCost } from "./api/Costs";
import { Localization } from "./api/Localization";
import { BigNumber } from "./api/BigNumber";
import { theory } from "./api/Theory";
import { Utils } from "./api/Utils";

var id = "OmegaEternity";
var name = "Omega Eternity";
var description = "jwklong";
var authors = "jwklong";
var version = 1;

var currency, currency_second;
var c1, c2, c3, c4, c5, c6, c7;
var c1Exp, c2Exp;

var achievement1, achievement2;
var chapter1, chapter2;

var init = () => {
    currency = theory.createCurrency();
    currency_second = theory.createCurrency("s", "s");

    ///////////////////
    // Regular Upgrades

    // c1
    {
        let getDesc = (level) => "c_1=" + getC1(level).toString(0);
        c1 = theory.createUpgrade(0, currency, new FirstFreeCost(new ExponentialCost(15, Math.log2(1.2))));
        c1.getDescription = (_) => Utils.getMath(getDesc(c1.level));
        c1.getInfo = (amount) => Utils.getMathTo(getDesc(c1.level), getDesc(c1.level + amount));
    }

    // c2
    {
        let getDesc = (level) => "c_2=" + getC2(level).toString(0);
        c2 = theory.createUpgrade(1, currency, new ExponentialCost(10, Math.log2(1.2)));
        c2.getDescription = (_) => Utils.getMath(getDesc(c2.level));
        c2.getInfo = (amount) => Utils.getMathTo(getInfo(c2.level), getInfo(c2.level + amount));
    }

    // c3
    {
        let getDesc = (level) => "c_3=" + getC3(level).toString(0);
        c3 = theory.createUpgrade(2, currency, new ExponentialCost(120, Math.log2(1.4)));
        c3.getDescription = (_) => Utils.getMath(getDesc(c3.level));
        c3.getInfo = (amount) => Utils.getMathTo(getInfo(c3.level), getInfo(c3.level + amount));
    }

    // c4
    {
        let getDesc = (level) => "c_4=" + getC4(level).toString(0);
        c4 = theory.createUpgrade(3, currency, new ExponentialCost(1e4, Math.log2(10)));
        c4.getDescription = (_) => Utils.getMath(getDesc(c4.level));
        c4.getInfo = (amount) => Utils.getMathTo(getInfo(c4.level), getInfo(c4.level + amount));
    }

    // c5
    {
        let getDesc = (level) => "c_5=" + getC5(level).toString(0);
        c5 = theory.createUpgrade(4, currency, new ExponentialCost(1.2e4, Math.log2(1.4)));
        c5.getDescription = (_) => Utils.getMath(getDesc(c5.level));
        c5.getInfo = (amount) => Utils.getMathTo(getInfo(c5.level), getInfo(c5.level + amount));
    }

    // c6
    {
        let getDesc = (level) => "c_6=" + getC6(level).toString(0);
        c6 = theory.createUpgrade(5, currency, new ExponentialCost(1.3e5, Math.log2(1.4)));
        c6.getDescription = (_) => Utils.getMath(getDesc(c6.level));
        c6.getInfo = (amount) => Utils.getMathTo(getInfo(c6.level), getInfo(c6.level + amount));
    }
    
    // c7
    {
        let getDesc = (level) => "c_7=" + getC7(level).toString(0);
        c7 = theory.createUpgrade(6, currency, new ExponentialCost(1.4e6, Math.log2(1.3)));
        c7.getDescription = (_) => Utils.getMath(getDesc(c7.level));
        c7.getInfo = (amount) => Utils.getMathTo(getInfo(c7.level), getInfo(c7.level + amount));
    }

    // c8
    {
        let getDesc = (level) => "c_8=" + getC8(level).toString(0);
        c8 = theory.createUpgrade(7, currency, new ExponentialCost(1.5e7, Math.log2(1.3)));
        c8.getDescription = (_) => Utils.getMath(getDesc(c8.level));
        c8.getInfo = (amount) => Utils.getMathTo(getInfo(c8.level), getInfo(c8.level + amount));
    }

    // c9
    {
        let getDesc = (level) => "c_9=" + getC9(level).toString(0);
        c9 = theory.createUpgrade(8, currency, new ExponentialCost(1e7, Math.log2(10)));
        c9.getDescription = (_) => Utils.getMath(getDesc(c9.level));
        c9.getInfo = (amount) => Utils.getMathTo(getInfo(c9.level), getInfo(c9.level + amount));
    }

    /////////////////////
    // Permanent Upgrades
    theory.createPublicationUpgrade(0, currency, 1e9);
    theory.createBuyAllUpgrade(1, currency, 0);
    theory.createAutoBuyerUpgrade(2, currency, 1e40);

    ///////////////////////
    //// Milestone Upgrades
    theory.setMilestoneCost(new LinearCost(25, 25));

    {
        c1Exp = theory.createMilestoneUpgrade(0, 3);
        c1Exp.description = Localization.getUpgradeIncCustomExpDesc("c_1", "0.05");
        c1Exp.info = Localization.getUpgradeIncCustomExpInfo("c_1", "0.05");
        c1Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }

    {
        c2Exp = theory.createMilestoneUpgrade(1, 3);
        c2Exp.description = Localization.getUpgradeIncCustomExpDesc("c_2", "0.05");
        c2Exp.info = Localization.getUpgradeIncCustomExpInfo("c_2", "0.05");
        c2Exp.boughtOrRefunded = (_) => theory.invalidatePrimaryEquation();
    }
    
    /////////////////
    //// Achievements
    let minute = 60;
    let hour = 3600;
    let day = 86400;
    let week = 86400 * 7;
    let year = 86400 * 365;
    let million = 1e6;
    let dialogue = 1e10;
    let quadrillion = 1e15;
    let guppy = 1e20;
    let returningscookie = 1.25231e36;
    let quadrupledialogue = 1e40;
    let vigintillion = 1e63;
    let closetoend = 1e72;
    let endgame = 1e81;
    
    achievement1 = theory.createAchievement(0, "?", "Start to Playing.", () => c1.level > 0);
    achievement2 = theory.createAchievement(1, "Cookie Bar", "gradma", () => c2.level > 0);
    achievement3 = theory.createAchievement(2, "You Having Do?", "Minute", () => currency_second.value > minute);
    achievement4 = theory.createAchievement(3, "What", "pi minutes", () => currency_second.value > Math.PI * minute);
    achievement5 = theory.createAchievement(4, "ИOI⅃⅃IM", "reverse text?", () => currency.value > million);
    achievement6 = theory.createAchievement(5, "Sugars", "Reach 1e8 Cookies.", () => currency.value > 100 * million);
    achievement7 = theory.createSecretAchievement(6, "Happend This?", "Reach 1.211e36 cookies", "Rewards of level", () => currency.value > returningscookie);

    ///////////////////
    //// Story chapters
    chapter1 = theory.createStoryChapter(0, "Starting!", "Have Bake this than bake is done \nget \nget \nget \nget \nwhat?", () => c1.level > 0);
    chapter2 = theory.createStoryChapter(1, "Atfer Million", "1 Million \nc \no \no \nk \ni \ne \ns", () => currency.value > million);
    chapter3 = theory.createStoryChapter(2, "Now", "M \nA \nJ \nO \nR \n\u7777", () => currency.value > year);

    updateAvailability();
}

var updateAvailability = () => {
    c2Exp.isAvailable = c1Exp.level > 0;
}

var tick = (elapsedTime, multiplier) => {
    let dt = BigNumber.from(elapsedTime * multiplier);
    let bonus = theory.publicationMultiplier;
    let minute = 60;
    let hour = 3600;
    let day = 86400;
    let week = 86400 * 7;
    let year = 86400 * 365;
    let million = 1e6;
    let dialogue = 1e10;
    let quadrillion = 1e15;
    let guppy = 1e20;
    let returningscookie = 1.25231e36;
    let quadrupledialogue = 1e40;
    let vigintillion = 1e63;
    let closetoend = 1e72;
    let endgame = 1e81;
    currency_second.value += BigNumber.from(0.1)
    currency.value += getC1(c1.level) + getC2(c2.level) + getC3(c3.level) + getC5(c5.level) + getC6(c6.level) + getC7(c7.level);
}

var getPrimaryEquation = () => {
    let result = "\\dot{\\rho} = c_1";

    if (c1Exp.level == 1) result += "^{1.05}";
    if (c1Exp.level == 2) result += "^{1.1}";
    if (c1Exp.level == 3) result += "^{1.15}";

    result += "c_2";

    if (c2Exp.level == 1) result += "^{1.05}";
    if (c2Exp.level == 2) result += "^{1.1}";
    if (c2Exp.level == 3) result += "^{1.15}";

    return result;
}

var getSecondaryEquation = () => theory.latexSymbol + "=\\max\\rho";
var getPublicationMultiplier = (tau) => tau.pow(1.003);
var getPublicationMultiplierFormula = (symbol) => "\\frac{{" + symbol + "}^{1.003}}{3}";
var getTau = () => currency.value.pow(0.1);
var get2DGraphValue = () => Math.PI;

var getC1 = (level) => BigNumber.from(0.1 * level) * getC4(c4.level)
var getC2 = (level) => BigNumber.from(0.5 * level) * getC9(c9.level)
var getC3 = (level) => BigNumber.from(2 * level)
var getC4 = (level) => Utils.getStepwisePowerSum(level, 100, 9, 1);
var getC5 = (level) => BigNumber.from(20 * level)
var getC6 = (level) => BigNumber.from(300 * level)
var getC7 = (level) => BigNumber.from(4000 * level)
var getC8 = (level) => BigNumber.from(50000 * level)
var getC9 = (level) => Utils.getStepwisePowerSum(level, 100, 9, 1);
var getC1Exponent = (level) => BigNumber.from(1 + 0.05 * level);
var getC2Exponent = (level) => BigNumber.from(1 + 0.05 * level);

init();
