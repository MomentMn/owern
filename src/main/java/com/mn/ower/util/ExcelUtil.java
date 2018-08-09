package com.mn.ower.util;


import java.awt.Color;
import java.util.List;

import org.apache.poi.ss.usermodel.*;
import org.apache.poi.xssf.usermodel.XSSFCellStyle;
import org.apache.poi.xssf.usermodel.XSSFColor;
import org.apache.poi.xssf.usermodel.XSSFRow;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.util.CollectionUtils;

import com.mn.ower.commons.BizException;

import java.io.OutputStream;
import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.Date;
/**
 * @version 1.0
 * @description:
 *       导出Excel的工具类
 * @projectName: com.taidii.staffdevelopment.util
 * @className: staff-development
 * @author:谭农春
 * @createTime:2018/6/25 10:48
 */
public class ExcelUtil {
  /**
   * 导出Excel
   *   //拿到palette颜色板
   *  HSSFPalette palette = excel.getCustomPalette();
   * //这个是重点，具体的就是把之前的颜色 HSSFColor.LIME.index
   *  //替换为  RGB(51,204,204) 宝石蓝这种颜色
   * //你可以改为 RGB(0,255,127)
   * palette.setColorAtIndex(HSSFColor.LIME.index, (byte) 0, (byte) 255, (byte) 127);
   * @param title 标题
   *         -- 标题
   * @param dataList 内容
   *          -- 内容
   * @return
   */
  public static XSSFWorkbook getWorkbook(String []title, List<String[]> dataList){
    XSSFWorkbook workBook = null;
    workBook = new XSSFWorkbook();
    // 生成一个表格
    XSSFSheet sheet = workBook.createSheet();
    workBook.setSheetName(0,"sheet1");

    // 创建表格标题行 第一行
    XSSFRow titleRow = sheet.createRow(0);
    // 设置表头的样式
    XSSFCellStyle style = workBook.createCellStyle();
    XSSFColor color =new XSSFColor( new Color(180, 180, 180));
    // 设置自定义背景色
    style.setFillForegroundColor(color);
    style.setFillPattern(FillPatternType.SOLID_FOREGROUND);
    style.setBorderBottom(BorderStyle.THIN);
    style.setBorderLeft(BorderStyle.THIN);
    style.setBorderRight(BorderStyle.THIN);
    style.setBorderTop(BorderStyle.THIN);
    style.setAlignment(HorizontalAlignment.CENTER);
    Cell cell =null;
    // 设置标题
    for(int i=0;i<title.length;i++){
      cell = titleRow.createCell(i);
      cell.setCellValue(title[i]);
      cell.setCellStyle(style);
    }
    // 定义内容的样式
     CellStyle contentStyle=workBook.createCellStyle();
    // 允许Excel 单元格换行
     contentStyle.setWrapText(true);
    // 设置边框
     contentStyle.setBorderBottom(BorderStyle.THIN);
    contentStyle.setBorderLeft(BorderStyle.THIN);
    contentStyle.setBorderRight(BorderStyle.THIN);
    contentStyle.setBorderTop(BorderStyle.THIN);
    contentStyle.setAlignment(HorizontalAlignment.CENTER);
    // 内容占位符
     Cell contentCell = null;
    // 设置内容
   if(!CollectionUtils.isEmpty(dataList)){
     Integer len = title.length;
     //插入需导出的数据
     for(int i=0;i<dataList.size();i++){
       XSSFRow row = sheet.createRow(i+1);
       // 遍历单元格
       if(null!=dataList.get(i)){
         if(len != dataList.get(i).length){
           // 导出Excel 异常，表头设置长度和数据不一致。
         // throw new BizException(CommonError.EXCEL_ERROR);
         }
         else {
          for(int j =0; j<len;j++){
            //遍历循环值
            contentCell = row.createCell(j);
            // 设置样式
            contentCell.setCellStyle(contentStyle);
            // 设置单元格样式
            contentCell.setCellValue(dataList.get(i)[j]);
          }
         }
       }
     }
   }
//    //数据加载完成，自动调整宽度
//    for(int i=0;i<title.length;i++) {
//      sheet.autoSizeColumn((short) i);
//    }
    return  workBook;
  }
    
    
    public static void exportExcel(List<?> data, OutputStream out) throws Exception {
      if(data == null || data.size() < 1){
          return;
      }
        Workbook wb = new XSSFWorkbook();
            dataToSheet(wb, data, null);
            wb.write(out);
    }
    public static void exportExcel(List<?> data, OutputStream out, String usedBy) throws Exception {
        if(data == null || data.size() < 1){
            return;
        }
        Workbook wb = new XSSFWorkbook();
        dataToSheet(wb, data, usedBy);
        wb.write(out);
    }
    
    private static void dataToSheet(Workbook wb,List<?> data, String usedBy) throws Exception {
        Class<?> dataClass = data.get(0).getClass();
        Field[] fields = dataClass.getDeclaredFields();
        List<String> methods = new ArrayList<String>();
        List<Class<?>> fieldsClass = new ArrayList<Class<?>>();
        
        ExcelSheet sheetA = dataClass.getAnnotation(ExcelSheet.class);
        String sheetName;
        if(sheetA != null) {
            sheetName = sheetA.value();
        }else {sheetName = "sheet";}
        
        Sheet sheet = wb.createSheet(sheetName);
        
        //Table Head
        Row head = sheet.createRow(0);
        int headColumnIndex = 0;
        for(Field f : fields) {
            ExcelColumn a = f.getAnnotation(ExcelColumn.class);
            if(a != null) {
                //如果注解的usedBy存在，如果没传usedBy 或usedBy与注解的usedBy不相同则跳过这个字段
                if(!"".equals(a.usedBy()) && (usedBy == null ||!a.usedBy().equals(usedBy))) {
                    continue;
                }
                Cell cell = head.createCell(headColumnIndex);
                cell.setCellValue(a.value());
                sheet.autoSizeColumn(headColumnIndex);
                methods.add("get" + firstUpCase(f.getName()));
                headColumnIndex++;
                Class<?> fieldClass = f.getType();
                fieldsClass.add(fieldClass);
            }
        }
        //Table data
        
        //date style
        CellStyle dateStyle = wb.createCellStyle();
        DataFormat format = wb.createDataFormat();
        
        //list
        CellStyle listStyle = wb.createCellStyle();
        listStyle.setWrapText(true);
        
        dateStyle.setDataFormat(format.getFormat("dd/MM/yyyy"));
        for(int i = 1; i <= data.size(); i++) {
            Row row = sheet.createRow(i);
            for(int j = 0;j<methods.size();j++) {
                String methodName = methods.get(j);
                Class<?> fieldClass = fieldsClass.get(j);
                Method method = dataClass.getMethod(methodName);
                Object result = method.invoke(data.get(i-1));
                String resultType = typeOfData(fieldClass);
                Cell cell = row.createCell(j);
                if("date".equals(resultType)){
                    dataToCell(result,resultType,cell,dateStyle);
                }else if("list".equals(resultType)){
                    dataToCell(result, resultType,cell, listStyle);
                }else {
                    dataToCell(result, resultType, cell);
                }
            }
        }
    }
    private static String firstUpCase(String str){
        return str.substring(0, 1).toUpperCase() + str.substring(1);
    }
    private static String typeOfData(Class<?> klass) {
        String name = klass.getName();
        if("java.lang.Integer".equals(name)) return "int";
        if("java.lang.Double".equals(name)) return "double";
        if("java.util.Date".equals(name)) return "date";
        if("java.lang.Boolean".equals(name)) return "bool";
        if("java.util.List".equals(name)) return "list";
        return "string";
    }
    private static void dataToCell(Object data, String dataType, Cell cell) {
        dataToCell(data, dataType, cell, null);
    }
    
    private static void dataToCell(Object data, String dataType, Cell cell, CellStyle style) {
        if(data == null) return;
        switch(dataType) {
            case "int": cell.setCellValue(((Integer)data).doubleValue());break;
            case "double":cell.setCellValue((Double)data);break;
            case "date": cell.setCellValue((Date)data);break;
            case "bool":cell.setCellValue((boolean)data);break;
            case "list":{
                String result = data.toString();
                result = result.substring(1, result.length()-1);
                cell.setCellValue(result);
                break;
            }
            default:cell.setCellValue(data.toString());break;
        }
        if(style != null){
            cell.setCellStyle(style);
        }
    }
}
