package com.lantu.domain.controller;

import com.lantu.common.vo.Result;
import com.lantu.domain.entity.Comments;
import com.lantu.domain.entity.User;
import com.lantu.domain.service.IUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.stereotype.Controller;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  前端控制器
 * </p>
 *
 * @author gxccc
 * @since 2023-05-29
 */
@RestController
@CrossOrigin
@ResponseBody
@RequestMapping("/domain/user")
public class UserController {
    @Autowired
    private IUserService userService;
    @GetMapping("/all")
    public Result<List<User>> getAllUser(){
        List<User>list = userService.list();
        return Result.success(list);
    }

    @PostMapping("/login")
    public Result<Map<String,Object>> login(@RequestBody User user){
        Map<String,Object> data =  userService.login(user);
        if(data != null){
            return Result.success(data);
        }
        return Result.error(20001,"用户名或密码错误");

    }
    @GetMapping("/info")
    public Result<User> getUserInfo(@RequestHeader("Token") String token){
        //根据token来获取redis的登录信息
        User data =  userService.getUserInfo(token);
        if (data != null){
            return Result.success(data);
        }
        return Result.error(20002,"用户登录信息失效");
    }

    @GetMapping("/specinfo")
    public Result<List<User>> getUserInfo(@RequestParam("id") int id){
        //根据token来获取redis的登录信息
        List<User> data =  userService.getSpecUserInfo(id);
        if (data != null){
            return Result.success(data);
        }
        return Result.error(20002,"用户登录信息失效");
    }

    @PostMapping("/logout")
    public Result<?> logout(@RequestHeader("Token") String token){
        userService.logout(token);
        return Result.success();
    }

    @PostMapping("/add")
    public  Result<Object> addUser(@RequestBody User user){
        boolean a = userService.addUser(user);
        if(a){
            return Result.success();
        }
        return Result.error(20004,"插入失败");
    }

    @PostMapping("/remove")
    public  Result<Object> removeUser(@RequestBody User user){
        boolean a = userService.removeUser(user);
        if(a){
            return Result.success();
        }
        return Result.error(20005,"删除失败");
    }

    @ PostMapping("/changePassword")
    public  Result<Object> changePassword(@RequestBody User user,@RequestHeader("Token") String token){
        boolean a = userService.changePassword(user,token);
        if(a){
            return Result.success();
        }
        return Result.error(20006,"修改失败");
    }

    @ PostMapping("/changeUserface")
    public  Result<Object> changeUserface(@RequestBody User user,@RequestHeader("Token") String token){
        boolean a = userService.changeUserface(user,token);
        if(a){
            return Result.success();
        }
        return Result.error(20006,"修改失败");
    }

    @ GetMapping("/getUploadToken")
    public  Result<String> getUploadToken(){
        String token = userService.returnUploadToken();
            return Result.success(token);

    }

    @ PostMapping("/alterUser")
    public  Result<Object> alterUser(@RequestBody User user){
        boolean a = userService.alterUser(user);
        if(a){
            return Result.success();
        }
        return Result.error(20006,"修改失败");
    }




}
