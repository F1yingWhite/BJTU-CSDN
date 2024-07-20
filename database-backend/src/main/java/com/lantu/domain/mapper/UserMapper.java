package com.lantu.domain.mapper;

import com.lantu.domain.entity.User;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;

import java.util.List;

/**
 * <p>
 *  Mapper 接口
 * </p>
 *
 * @author gxccc
 * @since 2023-05-29
 */
public interface UserMapper extends BaseMapper<User> {
    public List<String> getRoleNameByUserID(Integer userId);

//    public List<Integer> getUidByUserName(String userName);

}
