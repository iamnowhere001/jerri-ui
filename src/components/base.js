import Badge from "./badge";
import Button from "./button";
import Checkbox from "./checkbox";
import CheckboxGroup from "./checkbox-group";
import ChooseDistrict from "./chooseDistrict";
import ContactsList from "./contactsList";
import Container from "./container";
import DatePicker from "./datePicker";
import Form from "./form";
import FormItem from "./form-item";
import Head from "./head";
import ImgViews from "./imgViews";
import Input from "./input";
import LoadingPetal from "./loadingPetal";
import LoadingStep from "./loadingStep";
import Message from "./message";
import MessageBox from "./messageBox";
import Page from "./page";
import Radio from "./radio";
import RadioGroup from "./radio-group";
import SearchBar from "./searchBar";
import Sector from "./sector";
import Select from "./select";
import Switch from "./switch";
import TablePro from "./tablePro";
import Tabs from "./tabs";
import Top from "./top";
import Upload from "./upload";
import UploadFile from "./uploadFile";
import VideoPlayer from "./videoPlayer";
import WarnTips from "./warnTips";
import UploadFilePro from "./uploadFilePro";
import FilePreview from "./filePreview";

//  基础组件
const baseComponents = {
  Badge,
  Button,
  Checkbox,
  CheckboxGroup,
  ChooseDistrict,
  ContactsList,
  Container,
  DatePicker,
  Form,
  FormItem,
  Head,
  ImgViews,
  Input,
  LoadingPetal,
  LoadingStep,
  Message,
  MessageBox,
  Page,
  Radio,
  RadioGroup,
  SearchBar,
  Sector,
  Select,
  Switch,
  TablePro,
  Tabs,
  Top,
  Upload,
  UploadFile,
  VideoPlayer,
  WarnTips,
  UploadFilePro,
  FilePreview,
};

//  通用样式
import "../themes/common.scss";

//  工具类安装方法
import utilsInstall from "../utils/install";

/**
 * @desc 安装组件
 * @param {*} Vue Vue
 */
const install = (Vue) => {
  //  安装服务
  utilsInstall(Vue);

  //  安装组件
  Object.values(baseComponents).forEach((component) => {
    component.install(Vue);
  });
};

import config from "../../package.json";

export default {
  version: config.version,
  install,
  ...baseComponents,
};
