package com.mn.ower.util;

import javax.servlet.http.HttpServletRequest;

import com.mn.ower.commons.LoginUser;
import com.mn.ower.constans.Constants;
import com.mn.ower.error.*;

import java.util.ResourceBundle;

/**
 * @version 1.0
 * @description:语言辅助类
 * @author:王涛
 * @createTime:2018年7月9日 上午9:17:47
 */
public class LanguageUtil {

    public static String CHN_LAN = "zh_CN";
    public static String EN_LAN = "en-us";

    public static boolean isCHN(HttpServletRequest request) {
        try {
            LoginUser loginUser = (LoginUser) request.getSession().getAttribute(Constants.USER_LOGIN_);
            String language = loginUser.getLanguage();
            if (CHN_LAN.equals(language)) {
                return true;
            }
        } catch (Exception e) {
            e.printStackTrace();
            return false;
        }
        return false;
    }

    public static void setlanguage(HttpServletRequest request) {
        ResourceBundle resourceBundle;
        if (isCHN(request)) {
            resourceBundle = ResourceBundle.getBundle("message_zh_CN");
        }else{
            resourceBundle = ResourceBundle.getBundle("message_en_US");
        }
        getPropertice(resourceBundle);

    }
    private static void getPropertice(ResourceBundle resourceBundle){
//        CommonError.REQUEST_PARAMETER_ERROR.setMsg(resourceBundle.getString("REQUEST_PARAMETER_ERROR"));
//        CommonError.USER_AUTH_ERROR.setMsg(resourceBundle.getString("USER_AUTH_ERROR"));
//        CommonError.USER_LOGIN_ACCOUNTPWD_ERROR.setMsg(resourceBundle.getString("USER_LOGIN_ACCOUNTPWD_ERROR"));
//        CommonError.SYSTEM_ERROR.setMsg(resourceBundle.getString("SYSTEM_ERROR"));
//        CommonError.UPLOAD_FILE_ERROR.setMsg(resourceBundle.getString("UPLOAD_FILE_ERROR"));
//        CommonError.EXCEL_ERROR.setMsg(resourceBundle.getString("EXCEL_ERROR"));
//
//        DutyError.DUTY_NOT_CONTAIN_SKILL.setMsg(resourceBundle.getString("DUTY_NOT_CONTAIN_SKILL"));
//
//        ProductbundleError.NO_HQ.setMsg(resourceBundle.getString("NO_HQ"));
//        ProductbundleError.SAVE_FAIL.setMsg(resourceBundle.getString("SAVE_FAIL"));
//        ProductbundleError.NO_SELECT_COURSEORLEVEL.setMsg(resourceBundle.getString("NO_SELECT_COURSEORLEVEL"));
//        ProductbundleError.NO_PRODUCTBUNDLE.setMsg(resourceBundle.getString("NO_PRODUCTBUNDLE"));
//        ProductbundleError.NO_EXIST_CLASS.setMsg(resourceBundle.getString("NO_EXIST_CLASS"));
//
//        PromotionError.NO_SET_SKILL_LEVEL.setMsg(resourceBundle.getString("NO_SET_SKILL_LEVEL"));
//        PromotionError.SAME_SKILL_LEVEL.setMsg(resourceBundle.getString("SAME_SKILL_LEVEL"));
//        PromotionError.NO_EVALUATION_TIME.setMsg(resourceBundle.getString("NO_EVALUATION_TIME"));
//
//        SelfEvaluationError.SELF_EVALUATION_NOT_FOUND.setMsg(resourceBundle.getString("SELF_EVALUATION_NOT_FOUND"));
//        SelfEvaluationError.SELF_EVALUATION_AUBMITTED.setMsg(resourceBundle.getString("SELF_EVALUATION_AUBMITTED"));
//        SelfEvaluationError.SELF_EVALUATION_NOT_IN_DRAFT.setMsg(resourceBundle.getString("SELF_EVALUATION_NOT_IN_DRAFT"));
//        SelfEvaluationError.SELF_EVALUATION_NOT_IN_SUBMIT.setMsg(resourceBundle.getString("SELF_EVALUATION_NOT_IN_SUBMIT"));
//        SelfEvaluationError.SELF_EVALUATION_SKILL_NOT_FOUND.setMsg(resourceBundle.getString("SELF_EVALUATION_SKILL_NOT_FOUND"));
//        SelfEvaluationError.SELF_EVALUATION_REFLECTION_NOT_FOUND.setMsg(resourceBundle.getString("SELF_EVALUATION_REFLECTION_NOT_FOUND"));
//        SelfEvaluationError.SELF_EVALUATION_REFLECTION_DATA_ERROR.setMsg(resourceBundle.getString("SELF_EVALUATION_REFLECTION_DATA_ERROR"));
//        SelfEvaluationError.SELF_EVALUATION_PLAN_NOT_FOUND.setMsg(resourceBundle.getString("SELF_EVALUATION_PLAN_NOT_FOUND"));
//
//        SettingsError.SCORE_REPEAT_ERROR.setMsg(resourceBundle.getString("SCORE_REPEAT_ERROR"));
//        SettingsError.CATEGORY_CANNOT_NULL_ERROR.setMsg(resourceBundle.getString("CATEGORY_CANNOT_NULL_ERROR"));
//        SettingsError.DOMAIN_CANNOT_NULL_ERROR.setMsg(resourceBundle.getString("DOMAIN_CANNOT_NULL_ERROR"));
//        SettingsError.SKILL_NAME_CANNOT_NULL_ERROR.setMsg(resourceBundle.getString("SKILL_NAME_CANNOT_NULL_ERROR"));
//        SettingsError.GUIDING_QUESTIONS_CANNOT_NULL_ERROR.setMsg(resourceBundle.getString("GUIDING_QUESTIONS_CANNOT_NULL_ERROR"));
//        SettingsError.DATE_PARSE_ERROR.setMsg(resourceBundle.getString("DATE_PARSE_ERROR"));
//        SettingsError.DATE_REPEAT_ERROR.setMsg(resourceBundle.getString("DATE_REPEAT_ERROR"));
//        SettingsError.MID_ANNUAL_START_CONNECT_ANNUAL_DATE_ERROR.setMsg(resourceBundle.getString("MID_ANNUAL_START_CONNECT_ANNUAL_DATE_ERROR"));
//
//        TrainingError.COURSE_NOT_FIND.setMsg(resourceBundle.getString("COURSE_NOT_FIND"));
//        TrainingError.USER_NOT_FOUND.setMsg(resourceBundle.getString("USER_NOT_FOUND"));
//        TrainingError.TIME_NOT_SETTING.setMsg(resourceBundle.getString("TIME_NOT_SETTING"));
//
//        UpgradeError.DATA_NOT_UPGRADE.setMsg(resourceBundle.getString("DATA_NOT_UPGRADE"));
//
//        SelfEvaluationPeriodEnum.MID_YEAR.setName(resourceBundle.getString("MID_YEAR"));
//        SelfEvaluationPeriodEnum.ANNUAL.setName(resourceBundle.getString("ANNUAL"));
//
//        SelfEvaluationStatusEnum.DRAFT.setName(resourceBundle.getString("DRAFT"));
//        SelfEvaluationStatusEnum.SUBMIT.setName(resourceBundle.getString("SUBMIT"));
//        SelfEvaluationStatusEnum.REVIEWED.setName(resourceBundle.getString("REVIEWED"));
//        SelfEvaluationStatusEnum.OVERDUE_DRAFT.setName(resourceBundle.getString("OVERDUE_DRAFT"));
//        SelfEvaluationStatusEnum.OVERDUE_SUBMIT.setName(resourceBundle.getString("OVERDUE_SUBMIT"));

        Constants.setPreTitle(resourceBundle.getString("PRE_TITLE"));
        Constants.setPreName(resourceBundle.getString("PRE_NAME"));
        Constants.setPreLevel(resourceBundle.getString("PRE_LEVEL"));
        Constants.setPreLastappraisal(resourceBundle.getString("PRE_LASTAPPRAISAL"));
        Constants.setPROMOTION(resourceBundle.getString("PROMOTION"));
    }
}



