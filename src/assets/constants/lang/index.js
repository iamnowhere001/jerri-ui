// 获取语言类型 cn中文 en英文 没语言配置默认显示中文
let LANGE_TYPE = localStorage.lang || 'cn';

// 导入公共翻译
import common from "./common";
/**
 * 语言配置
 * 按模块划分 在需要翻译的文本前面加下划线用于区分文本并且能快速定位到
 * {}表示需要进行替换的部分
 */
let langConfig = {
  // 公共翻译
  common,
  // 通信录组件翻译
  contactList: {
    '_人名/岗位': {
      cn: '人名/岗位',
      en: 'Name/Position'
    },
    '_人员/部门': {
      cn: '人员/部门',
      en: 'Personnel/Department'
    },
    '_公司/部门': {
      cn: '公司/部门',
      en: 'Company/Department'
    },
    '_搜索': {
      cn: '搜索',
      en: 'Search'
    },
    '_无相关通讯录权限': {
      cn: '无相关通讯录权限',
      en: 'No contact access'
    },
    '_已选择此项': {
      cn: '已选择此项',
      en: 'Selected item'
    },
    '_添加': {
      cn: '添加',
      en: 'Add'
    },
    '_已选': {
      cn: '已选',
      en: 'Selected'
    },
    '_公司名称': {
      cn: '公司名称',
      en: 'Company name'
    },
    '_移除': {
      cn: '移除',
      en: 'Remove'
    },
    '_人员': {
      cn: '人员',
      en: 'Personnel'
    },
    '_部门': {
      cn: '部门',
      en: 'Department'
    },
    '_岗位': {
      cn: '岗位',
      en: 'Position'
    },
    '_选择': {
      cn: '选择',
      en: 'Select'
    },
    '_单次最多选择{}个': {
      cn: '单次最多选择{}个',
      en: 'Select a maximum of {} at a time'
    },
  },
  // 文件排序组件翻译
  fileSort: {
    '_点击可拖动排序': {
      cn: '点击可拖动排序',
      en: 'Drag to reorder'
    },
    '_文件排序': {
      cn: '文件排序',
      en: 'Order documents'
    }
  },
  // 头像裁剪组件翻译
  headCut: {
    '_上传头像': {
      cn: '上传头像',
      en: 'Upload profile photo'
    },
    '_选择头像': {
      cn: '选择头像',
      en: 'Choose profile photo'
    },
    '_旋转': {
      cn: '旋转',
      en: 'Rotate'
    },
    '_浏览图': {
      cn: '浏览图',
      en: 'View image'
    },
  },
  // 图片查看器组件翻译
  imgViews: {
    '_已是第一张': {
      cn: '已是第一张',
      en: 'This is the first photo'
    },
    '_上一张': {
      cn: '上一张',
      en: 'Last photo'
    },
    '_下一张': {
      cn: '下一张',
      en: 'Next photo'
    },
    '_已是最后一张': {
      cn: '已是最后一张',
      en: 'This is the last photo'
    },
    '_显示预览': {
      cn: '显示预览',
      en: 'Show preview'
    },
    '_隐藏预览': {
      cn: '隐藏预览',
      en: 'Hide preview'
    },
    '_放大图片': {
      cn: '放大图片',
      en: 'Zoom in'
    },
    '_缩小图片': {
      cn: '缩小图片',
      en: 'Zoom out'
    },
    '_向右旋转': {
      cn: '向右旋转',
      en: 'Rotate to the right'
    },
    '_下载': {
      cn: '下载',
      en: 'Download'
    },
  },
  // 模态框组件翻译
  messageBox: {
    '_提示': {
      cn: '提示',
      en: 'Notice'
    },
    '_确定删除': {
      cn: '确定删除',
      en: 'Want to delete'
    },
  },
  // 音乐播放器组件翻译
  musicPlayer: {
    '_播放列表': {
      cn: '播放列表',
      en: 'Playlist'
    },
    '_最小化': {
      cn: '最小化',
      en: 'Minimize'
    },
    '_上一首': {
      cn: '上一首',
      en: 'Last song'
    },
    '_播放': {
      cn: '播放',
      en: 'Play'
    },
    '_暂停': {
      cn: '暂停',
      en: 'Pause'
    },
    '_下一首': {
      cn: '下一首',
      en: 'Next song'
    },
    '_音量调节': {
      cn: '音量调节',
      en: 'Change volume'
    },
    '_当前为列表循环': {
      cn: '当前为列表循环',
      en: 'Playlist cycle'
    },
    '_当前为单曲循环': {
      cn: '当前为单曲循环',
      en: 'Single cycle'
    },
  },
  // 文件上传组件翻译
  uploadFile: {
    '_点击播放': {
      cn: '点击播放',
      en: 'Play'
    },
    '_上传失败点击重试': {
      cn: '上传失败点击重试',
      en: 'Upload failure! Click to retry'
    },
    '_点击上传': {
      cn: '点击上传',
      en: 'Click to upload'
    },
    '_重新上传': {
      cn: '重新上传',
      en: 'Reupload'
    },
    '_上传中': {
      cn: '上传中',
      en: 'Uploading'
    },
    '_点击预览': {
      cn: '点击预览',
      en: 'Click to preview'
    },
  },
  // 分页组件翻译
  page: {
    '_每页': {
      cn: '每页',
      en: 'Per page'
    },
    '_项': {
      cn: '项',
      en: 'Items'
    },
    '_共{}项记录': {
      cn: '共{}项记录',
      en: '{} items in total'
    },
    '_上一页': {
      cn: '上一页',
      en: 'Last page'
    },
    '_下一页': {
      cn: '下一页',
      en: 'Next page'
    },
  },
  // 富文本组件翻译
  richTextEditor: {
    '_选择素材': {
      cn: '选择素材',
      en: 'Select materials'
    },
    '_上传完成': {
      cn: '上传完成',
      en: 'Upload completed'
    },
    '_正在上传': {
      cn: '正在上传',
      en: 'Uploading'
    },
    '_素材上传完成后，请在文章中选择任意位置插入': {
      cn: '素材上传完成后，请在文章中选择任意位置插入',
      en: 'Please insert image after uploaded'
    },
    '_插入文中': {
      cn: '插入文中',
      en: 'Insert to the passage'
    },
    '_视频解码中...': {
      cn: '视频解码中...',
      en: 'Video decoding...'
    },
    '_从列表删除': {
      cn: '从列表删除',
      en: 'Delete from playlist'
    },
    '_图片大小不能超过20M': {
      cn: '图片大小不能超过20M',
      en: 'Image size cannot exceed 20 MB'
    },
    '_视频大小不能超过1G': {
      cn: '视频大小不能超过1G',
      en: 'Video cannot exceed 1 GB'
    },
    '_上传素材不得大于50条': {
      cn: '上传素材不得大于50条',
      en: 'Please upload no more than 50 items'
    },
  },
  // 搜索组件翻译
  searchBar: {
    '_搜索': {
      cn: '搜索',
      en: 'Search'
    },
    '_重置': {
      cn: '重置',
      en: 'Reset'
    },
    '_导出': {
      cn: '导出',
      en: 'Export'
    },
    '_收起搜索条件': {
      cn: '收起搜索条件',
      en: 'Fold search'
    },
    '_更多搜索条件': {
      cn: '更多搜索条件',
      en: 'More search conditions'
    },
  },
  // 选择框组件翻译
  select: {
    '_搜索': {
      cn: '搜索',
      en: 'Search'
    },
    '_无匹配结果': {
      cn: '无匹配结果',
      en: 'No matched result'
    },
    '_全部': {
      cn: '全部',
      en: 'All'
    },
  },
  // 签名组件翻译
  sign: {
    '_清空': {
      cn: '清空',
      en: 'Clear all'
    },
  },
  // 表格组件翻译
  tablePro: {
    '_全选': {
      cn: '全选',
      en: 'Select all'
    },
  },
  // 上传组件翻译
  upload: {
    '_文件数量不能大于{}': {
      cn: '文件数量不能大于{}',
      en: 'Please upload less than {} documents'
    },
    '_图片不能大于20M': {
      cn: '图片不能大于20M',
      en: 'Image cannot exceed 20MB'
    },
    '_文件大小不能超过{}M': {
      cn: '文件大小不能超过{}M',
      en: 'Document size cannot exceed {}MB'
    },
    '_文件大小不能小于{}M': {
      cn: '文件大小不能小于{}M',
      en: 'Document size must not be less than {}MB'
    },
    '_已过滤{}个不符合格式文件': {
      cn: '已过滤{}个不符合格式文件',
      en: '{} unmatched files are screened'
    },
    '_已过滤{}个空文件': {
      cn: '已过滤{}个空文件',
      en: '{} empty documents are screened'
    },
    '_已过滤{}个命名超过100字符的文件': {
      cn: '已过滤{}个命名超过100字符的文件',
      en: '{} incorrectly named documents have been filtered'
    },
    '_文件格式有误': {
      cn: '文件格式有误',
      en: 'Incorrect document format'
    },
    '_网络异常': {
      cn: '网络异常',
      en: 'Oops! Something went wrong'
    },
  },
  // 视频播放组件翻译
  videoPlayer: {
    '_视频转码中': {
      cn: '视频转码中，',
      en: 'Video converting '
    },
    '_尝试播放': {
      cn: '尝试播放',
      en: 'Play'
    },
    '_视频无法播放，请联系【系统管理员】': {
      cn: '视频无法播放，请联系【系统管理员】',
      en: "Video can't be played! Please contact the administrator"
    },
    '_无法快进': {
      cn: '无法快进',
      en: "Can't fast forward"
    },
    '_取消全屏': {
      cn: '取消全屏',
      en: 'Cancel full screen'
    },
    '_全屏': {
      cn: '全屏',
      en: 'Full screen'
    },
  },
};

/**
 * @desc 翻译方法
 * @param {String} name 需要翻译的文本
 * @return {String} 翻译后的文本
 * @author 陈宇奇
 * @date 2020年1月3日 14:44:38
 */
export function translate(name) {
  /**
   * @mark 根据组件前缀下划线命名翻译 例: button_新增
   * 公共翻译使用 common_新增
   */

  // 剪切对应组件和翻译文本
  let [compName, text] = name.split('_');
  // 在配置项中查找
  let content = langConfig[compName][`_${text}`][LANGE_TYPE];
  if (arguments.length > 1) {
    // 把占位符 {} 替换成传递的参数
    for (let i = 1; i < arguments.length; i++) {
      content = content.replace('{}', arguments[i]);
    }
  }
  return content;
}
