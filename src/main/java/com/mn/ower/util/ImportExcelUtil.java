package com.mn.ower.util;

import java.io.InputStream;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

/**
 * 
 * @description:Excel的导入
 * @author:王涛
 * @createTime:2018年6月26日 下午4:20:06
 * @version 1.0
 */
public class ImportExcelUtil {
	 //2003- 版本的excel  
	private final static String excel2003L =".xls";   
	//2007+ 版本的excel
    private final static String excel2007U =".xlsx";  
    
    /**
     * 
     * @description:获取IO流中的数据，组装成List<List<Object>>对象 
     * @param in
     * @param fileName
     * @return
     * @throws Exception
     * @author:王涛
     * @createTime:2018年6月26日 下午4:21:32
     */
    public  List<List<Object>> getBankListByExcel(InputStream in,String fileName) throws Exception{  
        List<List<Object>> list = null;  
          
        //创建Excel工作薄  
        Workbook work = this.getWorkbook(in,fileName);  
        if(null == work){  
            throw new Exception("Creat Excel faild！");  
        }  
        Sheet sheet = null;  
        Row row = null;  
        Cell cell = null;  
          
        list = new ArrayList<List<Object>>();  
        //遍历Excel中所有的sheet  
        for (int i = 0; i < work.getNumberOfSheets(); i++) {  
            sheet = work.getSheetAt(i);  
            if(sheet==null){continue;}  
              //System.out.println("长度FirstRowNum："+sheet.getFirstRowNum());
              //System.out.println("最终长度LastRowNum："+ sheet.getLastRowNum());
            //遍历当前sheet中的所有行  
            for (int j = sheet.getFirstRowNum(); j <= sheet.getLastRowNum(); j++) {  
                row = sheet.getRow(j);  
                if(row==null||row.getFirstCellNum()==j){continue;}
                //过滤掉空行
                if(null==row.getCell(0) || "".equals(row.getCell(0).toString())){
            		continue;
            	}
                //遍历所有的列  
                List<Object> li = new ArrayList<Object>();  
                for (int y = row.getFirstCellNum(); y < row.getLastCellNum(); y++) {  
                    cell = row.getCell(y);
                    if(null==cell || "".equals(cell.toString())){
                    	throw new Exception("The cell does not empty！Please check out");
                    }
                    //this.getCellValue(cell)
                    li.add(this.getCellValue(cell));  
                }  
                list.add(li);  
            }  
        }  
        work.close();  
        return list;  
    }
    
    /**
     * 
     * @description:对表格中数值进行格式化 
     * @param cell
     * @return
     * @author:王涛
     * @createTime:2018年6月26日 下午4:22:53
     */
	private Object getCellValue(Cell cell) {
		Object value = null;  
        DecimalFormat df = new DecimalFormat("0");  //格式化number String字符  
        SimpleDateFormat sdf = new SimpleDateFormat("yyy-MM-dd");  //日期格式化  
        SimpleDateFormat sdf1 = new SimpleDateFormat("HH:mm:ss");  //日期格式化
        DecimalFormat df2 = new DecimalFormat("0.00");  //格式化数字  
          
        switch (cell.getCellType()) {  
        case Cell.CELL_TYPE_STRING:  
            value = cell.getRichStringCellValue().getString();  
            break;  
        case Cell.CELL_TYPE_NUMERIC:  
            if("General".equals(cell.getCellStyle().getDataFormatString())){  
                value = df.format(cell.getNumericCellValue());  
            }else if("m/d/yy".equals(cell.getCellStyle().getDataFormatString())){  
                value = sdf.format(cell.getDateCellValue());  
            }else{  
            	value=sdf1.format(cell.getDateCellValue());
               // value = df2.format(cell.getNumericCellValue());  
            }  
            break;  
        case Cell.CELL_TYPE_BOOLEAN:  
            value = cell.getBooleanCellValue();  
            break;  
        case Cell.CELL_TYPE_BLANK:  
            value = "";  
            break;  
        default:  
            break;  
        }  
        return value;  
	}
	
	/**
	 * 
	 * @description:根据文件后缀，自适应上传文件的版本  
	 * @param in
	 * @param fileName
	 * @return
	 * @author:王涛
	 * @throws Exception 
	 * @createTime:2018年6月26日 下午4:21:57
	 */
	private Workbook getWorkbook(InputStream inStr, String fileName) throws Exception {
		Workbook wb = null;  
        String fileType = fileName.substring(fileName.lastIndexOf("."));  
        if(excel2003L.equals(fileType)){  
            wb = new HSSFWorkbook(inStr);  //2003-  
        }else if(excel2007U.equals(fileType)){  
            wb = new XSSFWorkbook(inStr);  //2007+  
        }else{  
            throw new Exception("import faild！");  
        }  
        return wb;
	}  
}
