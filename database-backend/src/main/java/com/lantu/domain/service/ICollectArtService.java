package com.lantu.domain.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.lantu.domain.entity.Article;
import com.lantu.domain.entity.CollectArt;

import java.util.List;

/**
 * <p>
 *  服务类
 * </p>
 *
 * @author gxccc
 * @since 2023-06-16
 */
public interface ICollectArtService extends IService<CollectArt> {

    List<Article> getUserCollect(int uid);

    boolean removeCol(CollectArt collectArt, String token);

    boolean addRelation(CollectArt co, String token);
}
