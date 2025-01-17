package com.lantu.domain.service;

import com.lantu.domain.entity.User;
import com.baomidou.mybatisplus.extension.service.IService;

import java.util.List;
import java.util.Map;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author gxccc
 * @since 2023-05-29
 */
public interface IUserService extends IService<User> {

    Map<String, Object> login(User user);

    User getUserInfo(String token);

    void logout(String token);

    boolean removeUser(User user);

    boolean addUser(User user);

    boolean changePassword(User user,String token);

    boolean changeUserface(User user, String token);

    String returnUploadToken();

    boolean alterUser(User user);

    List<User> getSpecUserInfo(int id);
}
