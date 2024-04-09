<template>
  <div>
   <h2 class="j-mb-20">文件排序组件</h2>

    <jr-button @click="showFileSort = true">打开</jr-button>
    
    <jr-file-sort :files="filesArr"
                  title="文件排序弹窗的标题"
                  :showFileSort.sync="showFileSort"></jr-file-sort>
  </div>
</template>

<script>
export default {
  name: "fileSortView",
  label: "文件排序",
  data() {
    return {
      filesArr: [
        {
          fileMd5: "64546d101ce8da114c064f8e3ae943f7",
          fileAddress:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/ccs/64546d101ce8da114c064f8e3ae943f7/u=3519956291,4147023926&fm=11&gp=0.jpg",
          fileSuffix: "jpg",
          uploadProess: 1,
          isShowCir: false,
          fileSize: 45347,
          newFileName: "0.94226508487302391562990640379",
          oldFileName: "u=3519956291,4147023926&fm=11&gp=0"
        },
        {
          fileMd5: "984fce6b93fc87c0447af466f584d08b",
          fileAddress:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/ccs/984fce6b93fc87c0447af466f584d08b/u=869807873,4205268148&fm=11&gp=0.jpg",
          fileSuffix: "jpg",
          uploadProess: 1,
          isShowCir: false,
          fileSize: 128758,
          newFileName: "0.78025884607432011562990643963",
          oldFileName: "u=869807873,4205268148&fm=11&gp=0"
        },
        {
          fileMd5: "984fce6b93fc87c0447af466f584d08b",
          fileAddress:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/ccs/7a65c2eb44e8caee469f97b9ff760004/xiaoxie.mp4",
          fileSuffix: "jpg",
          uploadProess: 1,
          isShowCir: false,
          fileSize: 128758,
          newFileName: "0.78025884607432011562990643963",
          oldFileName: "u=869807873,4205268148&fm=11&gp=0"
        },
        {
          fileMd5: "64546d101ce8da114c064f8e3ae943f7",
          fileAddress:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/ccs/64546d101ce8da114c064f8e3ae943f7/u=3519956291,4147023926&fm=11&gp=0.jpg",
          fileSuffix: "jpg",
          uploadProess: 1,
          isShowCir: false,
          fileSize: 45347,
          newFileName: "0.94226508487302391562990640379",
          oldFileName: "u=3519956291,4147023926&fm=11&gp=0"
        },
        {
          fileMd5: "984fce6b93fc87c0447af466f584d08b",
          fileAddress:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/ccs/984fce6b93fc87c0447af466f584d08b/u=869807873,4205268148&fm=11&gp=0.jpg",
          fileSuffix: "jpg",
          uploadProess: 1,
          isShowCir: false,
          fileSize: 128758,
          newFileName: "0.78025884607432011562990643963",
          oldFileName: "u=869807873,4205268148&fm=11&gp=0"
        },
        {
          fileMd5: "984fce6b93fc87c0447af466f584d08b",
          fileAddress:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/ccs/7a65c2eb44e8caee469f97b9ff760004/xiaoxie.mp4",
          fileSuffix: "jpg",
          uploadProess: 1,
          isShowCir: false,
          fileSize: 128758,
          newFileName: "0.78025884607432011562990643963",
          oldFileName: "u=869807873,4205268148&fm=11&gp=0"
        },
        {
          fileMd5: "64546d101ce8da114c064f8e3ae943f7",
          fileAddress:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/ccs/64546d101ce8da114c064f8e3ae943f7/u=3519956291,4147023926&fm=11&gp=0.jpg",
          fileSuffix: "jpg",
          uploadProess: 1,
          isShowCir: false,
          fileSize: 45347,
          newFileName: "0.94226508487302391562990640379",
          oldFileName: "u=3519956291,4147023926&fm=11&gp=0"
        },
        {
          fileMd5: "984fce6b93fc87c0447af466f584d08b",
          fileAddress:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/ccs/984fce6b93fc87c0447af466f584d08b/u=869807873,4205268148&fm=11&gp=0.jpg",
          fileSuffix: "jpg",
          uploadProess: 1,
          isShowCir: false,
          fileSize: 128758,
          newFileName: "0.78025884607432011562990643963",
          oldFileName: "u=869807873,4205268148&fm=11&gp=0"
        },
        {
          fileMd5: "984fce6b93fc87c0447af466f584d08b",
          fileAddress:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/ccs/7a65c2eb44e8caee469f97b9ff760004/xiaoxie.mp4",
          fileSuffix: "jpg",
          uploadProess: 1,
          isShowCir: false,
          fileSize: 128758,
          newFileName: "0.78025884607432011562990643963",
          oldFileName: "u=869807873,4205268148&fm=11&gp=0"
        },
        {
          fileMd5: "64546d101ce8da114c064f8e3ae943f7",
          fileAddress:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/ccs/64546d101ce8da114c064f8e3ae943f7/u=3519956291,4147023926&fm=11&gp=0.jpg",
          fileSuffix: "jpg",
          uploadProess: 1,
          isShowCir: false,
          fileSize: 45347,
          newFileName: "0.94226508487302391562990640379",
          oldFileName: "u=3519956291,4147023926&fm=11&gp=0"
        },
        {
          fileMd5: "984fce6b93fc87c0447af466f584d08b",
          fileAddress:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/ccs/984fce6b93fc87c0447af466f584d08b/u=869807873,4205268148&fm=11&gp=0.jpg",
          fileSuffix: "jpg",
          uploadProess: 1,
          isShowCir: false,
          fileSize: 128758,
          newFileName: "0.78025884607432011562990643963",
          oldFileName: "u=869807873,4205268148&fm=11&gp=0"
        },
        {
          fileMd5: "984fce6b93fc87c0447af466f584d08b",
          fileAddress:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/ccs/7a65c2eb44e8caee469f97b9ff760004/xiaoxie.mp4",
          fileSuffix: "jpg",
          uploadProess: 1,
          isShowCir: false,
          fileSize: 128758,
          newFileName: "0.78025884607432011562990643963",
          oldFileName: "u=869807873,4205268148&fm=11&gp=0"
        },
        {
          fileMd5: "64546d101ce8da114c064f8e3ae943f7",
          fileAddress:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/ccs/64546d101ce8da114c064f8e3ae943f7/u=3519956291,4147023926&fm=11&gp=0.jpg",
          fileSuffix: "jpg",
          uploadProess: 1,
          isShowCir: false,
          fileSize: 45347,
          newFileName: "0.94226508487302391562990640379",
          oldFileName: "u=3519956291,4147023926&fm=11&gp=0"
        },
        {
          fileMd5: "984fce6b93fc87c0447af466f584d08b",
          fileAddress:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/ccs/984fce6b93fc87c0447af466f584d08b/u=869807873,4205268148&fm=11&gp=0.jpg",
          fileSuffix: "jpg",
          uploadProess: 1,
          isShowCir: false,
          fileSize: 128758,
          newFileName: "0.78025884607432011562990643963",
          oldFileName: "u=869807873,4205268148&fm=11&gp=0"
        },
        {
          fileMd5: "984fce6b93fc87c0447af466f584d08b",
          fileAddress:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/ccs/7a65c2eb44e8caee469f97b9ff760004/xiaoxie.mp4",
          fileSuffix: "jpg",
          uploadProess: 1,
          isShowCir: false,
          fileSize: 128758,
          newFileName: "0.78025884607432011562990643963",
          oldFileName: "u=869807873,4205268148&fm=11&gp=0"
        },
        {
          fileMd5: "64546d101ce8da114c064f8e3ae943f7",
          fileAddress:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/ccs/64546d101ce8da114c064f8e3ae943f7/u=3519956291,4147023926&fm=11&gp=0.jpg",
          fileSuffix: "jpg",
          uploadProess: 1,
          isShowCir: false,
          fileSize: 45347,
          newFileName: "0.94226508487302391562990640379",
          oldFileName: "u=3519956291,4147023926&fm=11&gp=0"
        },
        {
          fileMd5: "984fce6b93fc87c0447af466f584d08b",
          fileAddress:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/ccs/984fce6b93fc87c0447af466f584d08b/u=869807873,4205268148&fm=11&gp=0.jpg",
          fileSuffix: "jpg",
          uploadProess: 1,
          isShowCir: false,
          fileSize: 128758,
          newFileName: "0.78025884607432011562990643963",
          oldFileName: "u=869807873,4205268148&fm=11&gp=0"
        },
        {
          fileMd5: "984fce6b93fc87c0447af466f584d08b",
          fileAddress:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/ccs/7a65c2eb44e8caee469f97b9ff760004/xiaoxie.mp4",
          fileSuffix: "jpg",
          uploadProess: 1,
          isShowCir: false,
          fileSize: 128758,
          newFileName: "0.78025884607432011562990643963",
          oldFileName: "u=869807873,4205268148&fm=11&gp=0"
        },
        {
          fileMd5: "984fce6b93fc87c0447af466f584d08b",
          fileAddress:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/ccs/7a65c2eb44e8caee469f97b9ff760004/xiaoxie.mp3",
          fileSuffix: "jpg",
          uploadProess: 1,
          isShowCir: false,
          fileSize: 128758,
          newFileName: "0.78025884607432011562990643963",
          oldFileName: "u=869807873,4205268148&fm=11&gp=0"
        },
        {
          fileMd5: "984fce6b93fc87c0447af466f584d08b",
          fileAddress:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/ccs/7a65c2eb44e8caee469f97b9ff760004/xiaoxie.ppt",
          fileSuffix: "jpg",
          uploadProess: 1,
          isShowCir: false,
          fileSize: 128758,
          newFileName: "0.78025884607432011562990643963",
          oldFileName: "u=869807873,4205268148&fm=11&gp=0"
        },
        {
          fileMd5: "984fce6b93fc87c0447af466f584d08b",
          fileAddress:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/ccs/7a65c2eb44e8caee469f97b9ff760004/xiaoxie.xls",
          fileSuffix: "jpg",
          uploadProess: 1,
          isShowCir: false,
          fileSize: 128758,
          newFileName: "0.78025884607432011562990643963",
          oldFileName: "u=869807873,4205268148&fm=11&gp=0"
        },
        {
          fileMd5: "984fce6b93fc87c0447af466f584d08b",
          fileAddress:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/ccs/7a65c2eb44e8caee469f97b9ff760004/xiaoxie.doc",
          fileSuffix: "jpg",
          uploadProess: 1,
          isShowCir: false,
          fileSize: 128758,
          newFileName: "0.78025884607432011562990643963",
          oldFileName: "u=869807873,4205268148&fm=11&gp=0"
        },
        {
          fileMd5: "984fce6b93fc87c0447af466f584d08b",
          fileAddress:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/ccs/7a65c2eb44e8caee469f97b9ff760004/xiaoxie.rar",
          fileSuffix: "jpg",
          uploadProess: 1,
          isShowCir: false,
          fileSize: 128758,
          newFileName: "0.78025884607432011562990643963",
          oldFileName: "u=869807873,4205268148&fm=11&gp=0"
        },
        {
          fileMd5: "984fce6b93fc87c0447af466f584d08b",
          fileAddress:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/ccs/7a65c2eb44e8caee469f97b9ff760004/xiaoxie.txt",
          fileSuffix: "jpg",
          uploadProess: 1,
          isShowCir: false,
          fileSize: 128758,
          newFileName: "0.78025884607432011562990643963",
          oldFileName: "u=869807873,4205268148&fm=11&gp=0"
        },
        {
          fileMd5: "984fce6b93fc87c0447af466f584d08b",
          fileAddress:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/ccs/7a65c2eb44e8caee469f97b9ff760004/xiaoxie.ai",
          fileSuffix: "jpg",
          uploadProess: 1,
          isShowCir: false,
          fileSize: 128758,
          newFileName: "0.78025884607432011562990643963",
          oldFileName: "u=869807873,4205268148&fm=11&gp=0"
        },
        {
          fileMd5: "984fce6b93fc87c0447af466f584d08b",
          fileAddress:
            "http://jerrisoft-test.oss-cn-shenzhen.aliyuncs.com/ccs/7a65c2eb44e8caee469f97b9ff760004/xiaoxie.cdr",
          fileSuffix: "jpg",
          uploadProess: 1,
          isShowCir: false,
          fileSize: 128758,
          newFileName: "0.78025884607432011562990643963",
          oldFileName: "u=869807873,4205268148&fm=11&gp=0"
        }
      ],
      showFileSort: true
    };
  },
  computed: {},
  methods: {}
};
</script>
