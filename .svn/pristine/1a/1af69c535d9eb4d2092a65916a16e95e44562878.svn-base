package com.ding.cms.web.controller;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.ding.cms.entity.Construction;
import com.ding.cms.service.ConstructionService;
import com.ding.cms.util.Constants;
import com.ding.cms.util.QRCodeUtil;
import com.yonyou.iuap.mvc.type.SearchParams;
import com.yonyou.iuap.system.web.controller.BaseController;

@Controller
public class ConstructionController extends BaseController{
	
	@Autowired
	private ConstructionService sysTeamService;
	
	@RequestMapping(value = "/construction/page", method = RequestMethod.GET)
    public @ResponseBody Object page(PageRequest pageRequest, SearchParams searchParams) {
        Page<Construction> result =
        		sysTeamService.selectAllByPage(pageRequest, searchParams.getSearchMap());
        return buildSuccess(result);
    }
	@RequestMapping(value = "/construction/save", method = RequestMethod.POST)
    public @ResponseBody Object save(@RequestBody List<Construction> list) {
		Construction entity=list.get(0);
		Construction obj=   sysTeamService.save(entity);
        return buildSuccess(obj);
    }
	
	@RequestMapping(value = "/construction/del", method = RequestMethod.POST)
	public @ResponseBody Object del(@RequestBody List<Construction> list) {
		sysTeamService.delete(list);
		return buildSuccess();
	}
	
	@RequestMapping(value = "/webconstruction/show", method = RequestMethod.GET)
    public @ResponseBody Object page(HttpServletRequest request) {
		return buildSuccess(sysTeamService.show(request.getParameter("id")));
    }
	@RequestMapping(value = "/construction/pagefilter", method = RequestMethod.GET)
    public @ResponseBody Object pagefilter(PageRequest pageRequest, SearchParams searchParams) {
        Page<Construction> result =
        		sysTeamService.selectAllbyCon(pageRequest, searchParams.getSearchMap());
        return buildSuccess(result);
    }
	@RequestMapping(value = "/construction/qrcode", method = RequestMethod.GET)
    public @ResponseBody void updateQRCode(HttpServletRequest request,HttpServletResponse response) {
		OutputStream os = null;
		File file=null;
		FileInputStream  outPutImage=null;
		String id=request.getParameter("id");
		try {
			os=response.getOutputStream();
			String constructioninfo=Constants.MESSAGE_CONSTRUCTIONINFO;
			String tempOutPutPath = this.getClass().getResource("").getFile()+id+".jpg";//本地临时图片
			QRCodeUtil.zxingCodeCreate(constructioninfo+ id, 300, 300, tempOutPutPath, "jpg");
			file=new File(tempOutPutPath);
			outPutImage = new FileInputStream(file);
			int count = 0;
			byte[] buffer = new byte[1024 * 8];
			while ((count = outPutImage.read(buffer)) != -1) {
				os.write(buffer, 0, count);
				os.flush();
			}
			
		} catch (IOException e) {
			// TODO 自动生成的 catch 块
			e.printStackTrace();
		}finally{
			try {
				if(os!=null)os.close();
				if(outPutImage!=null)outPutImage.close();
			} catch (IOException e) {
				// TODO 自动生成的 catch 块
				e.printStackTrace();
			}
			file.delete();
		}
    }
}
