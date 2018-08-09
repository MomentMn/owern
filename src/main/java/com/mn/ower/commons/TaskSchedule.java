package com.mn.ower.commons;

import java.util.Date;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

/**
 * @description:定时任务
 * @projectName:staff-development
 * @className:TaskSchedule.java
 * @author:wentao
 * @createTime:2018年6月21日 上午10:00:31
 * @version 1.0.1
 */
@Component
public class TaskSchedule {
	
	private Logger logger = LoggerFactory.getLogger(TaskSchedule.class);
	
	/*@Autowired
	private ITimeSettingService timeSettingService;
	@Autowired
	private ISelfEvaluationService selfEvaluationService;
	@Autowired
	private ISettingsService settingsService;*/

	/**
	 * @description:每晚执行
	 * @author: 衷文涛
	 * @createTime:2018年6月23日 下午3:33:54
	 */
	/*@Scheduled(cron = "0 0 0 ? * *")
	public void endDaySchedule() {
		
		logger.info("每晚定时任务开始");
		
		String date = DateUtils.dateToString(new Date(), DateUtils.YYMMDD);
		
		//获取每个学校时间设置，判断这个学校的自评是否需要被过期
		List<DevelopTimeSetting> list = timeSettingService.getTeacherNeedOverdue(date);
		//过期老师自评
		selfEvaluationService.overdueTeacherSelfEvaluation(list);
		
		//获取每个学校时间设置，判断这个学校的自评是否需要被过期
		list = timeSettingService.getNeedOverdue(date);
		
		//过期所有自评自评
		selfEvaluationService.overdueSelfEvaluation(list);
		
		//查询所有当年所有可以升级的时间设定
		//获取所有需要升级的学校情况
		list = timeSettingService.getNeedUpgrade(date);
		
		//升级学校基础配置
		//升级score
		settingsService.upgradeScore(list);
		//升级skill和guidencing
		settingsService.upgradeDutyLevelSkill(list);
		
		//推送自评
		selfEvaluationService.pushSelfEvaluation(list);
		
		logger.info("每晚定时任务结束");
	}*/
}
