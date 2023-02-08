const llversion = ll.requireVersion(2,9,2)?[0,5,3,Version.Beta]:[0,5,3]
ll.registerPlugin("infoMotd","在motd上显示各种实时信息",llversion,{Author:"小鼠同学"});
const contents = new JsonConfigFile("plugins\\infoMotd\\contents.json");
const conf = new JsonConfigFile("plugins\\infoMotd\\config.json");
/*try{
	const PAPI = require('./lib/BEPlaceholderAPI-JS').PAPI;
	log(PAPI);
}catch(err){
	log("未安装BEPlaceholderAPI，将禁用部分扩展功能。");
}*/
//const PAPI = require('./lib/BEPlaceholderAPI-JS').PAPI;

contents.init("motd",[
	{
		type:"static",
		contents:"§l§b静态"
	},
	{
		type:"alt",
		contents:[
			"§r§c轮播1",
			"§r§d轮播2",
			"§r§e$weather3"
		],
		random:false
	},
	{
		type:"roll",
		contents:"§r§l滚动§r§4部分",
		length:2
	}
]);
conf.init("frequency",5000);
let i;
let timecolor="f";
let tpstype=null;
class tps{
	constructor(){
		let i = 0;
		const availabletpsplugins=["QueryTPS","BEPlaceholderAPI","Cleaner"];
		for(i=0;i<availabletpsplugins.length;i++){
			if(ll.listPlugins().includes(availabletpsplugins[i])){
				this.type=availabletpsplugins[i];
				break;
			}
		}
	}
	currentTps(){
		let tpsfunc;
		switch(this.type){
			case "QueryTPS": {
				tpsfunc=ll.import("QueryTPS", "GetCurrentTPS");
				return tpsfunc();
			}
			case "BEPlaceholderAPI": {
				tpsfunc=require('./lib/BEPlaceholderAPI-JS').PAPI;
				return tpsfunc.getValue("server_tps");
			}
			case "Cleaner": {
				tpsfunc=ll.import("Cleaner", "GetCurrentTPS");
				return tpsfunc();
			}
			default:{
				return null;
			}
		}
	}
	averageTps(){
		let tpsfunc;
		switch(this.type){
			case "QueryTPS": {
				tpsfunc=ll.import("QueryTPS", "GetAverageTPS");
				return tpsfunc();
			}
			case "BEPlaceholderAPI": {
				tpsfunc=require('./lib/BEPlaceholderAPI-JS').PAPI;
				return tpsfunc.getValue("server_tps");
			}
			case "Cleaner": {
				tpsfunc=ll.import("Cleaner", "GetAverageTPS");
				return tpsfunc();
			}
			default:{
				return null;
			}
		}
	}
	plugin(){
		return this.type;
	}
}
class mspt{
	constructor(){
		const availableplugins=["BEPlaceholderAPI"];
		for(i=0;i<availableplugins.length;i++){
			if(ll.listPlugins().includes(availableplugins[i])){
				this.type=availableplugins[i];
				break;
			}
		}
	}
	get(){
		let msptfunc;
		switch(this.type){
			case "BEPlaceholderAPI": {
				msptfunc=require('./lib/BEPlaceholderAPI-JS').PAPI;
				return msptfunc.getValue("server_mspt");
			}
			default:{
				return null;
			}
		}
	}
	plugin(){
		return this.type;
	}
}
class version{
	constructor(){
		const availableplugins=["BEPlaceholderAPI"];
		for(i=0;i<availableplugins.length;i++){
			if(ll.listPlugins().includes(availableplugins[i])){
				this.type=availableplugins[i];
				break;
			}
		}
	}
	get(){
		let getfunc;
		switch(this.type){
			case "BEPlaceholderAPI": {
				getfunc=require('./lib/BEPlaceholderAPI-JS').PAPI;
				return getfunc.getValue("server_version");
			}
			default:{
				return mc.BDSVersion();
			}
		}
	}
	plugin(){
		return this.type;
	}
}
class protocol{
	constructor(){
		const availableplugins=["BEPlaceholderAPI"];
		for(i=0;i<availableplugins.length;i++){
			if(ll.listPlugins().includes(availableplugins[i])){
				this.type=availableplugins[i];
				break;
			}
		}
	}
	get(){
		let getfunc;
		switch(this.type){
			case "BEPlaceholderAPI": {
				getfunc=require('./lib/BEPlaceholderAPI-JS').PAPI;
				return getfunc.getValue("server_protocol_version");
			}
			default:{
				return mc.getServerProtocolVersion();
			}
		}
	}
	plugin(){
		return this.type;
	}
}
class entities{
	constructor(){
		const availableplugins=["BEPlaceholderAPI"];
		for(i=0;i<availableplugins.length;i++){
			if(ll.listPlugins().includes(availableplugins[i])){
				this.type=availableplugins[i];
				break;
			}
		}
	}
	get(){
		let getfunc;
		switch(this.type){
			case "BEPlaceholderAPI": {
				getfunc=require('./lib/BEPlaceholderAPI-JS').PAPI;
				return getfunc.getValue("server_total_entities");
			}
			default:{
				return null;
			}
		}
	}
	plugin(){
		return this.type;
	}
}
class uptime{
	constructor(){
		const availableplugins=["BEPlaceholderAPI"];
		for(i=0;i<availableplugins.length;i++){
			if(ll.listPlugins().includes(availableplugins[i])){
				this.type=availableplugins[i];
				break;
			}
		}
	}
	get(){
		let getfunc;
		switch(this.type){
			case "BEPlaceholderAPI": {
				getfunc=require('./lib/BEPlaceholderAPI-JS').PAPI;
				return getfunc.getValue("server_uptime");
			}
			default:{
				return null;
			}
		}
	}
	plugin(){
		return this.type;
	}
}
mc.listen("onServerStarted", () => {

	main();
    /*PAPI.registerServerPlaceholder(phapimspt,"BEPlaceholderAPI_JS","server_mspt")
	PAPI.registerServerPlaceholder(phapimspt,"BEPlaceholderAPI_JS","server_tps")
	PAPI.registerServerPlaceholder(phapimspt,"BEPlaceholderAPI_JS","server_world_name")*/
	//log(PAPI.getValue("server_protocol_version"));
	//log(PAPI.translateString("%server_tps%",mc.getOnlinePlayers()[0]));
})
function main(){
	//let motdtps=new tps(tpstype);
	//log(motdtps.currentTps())
	//log(new tps().plugin());
	playmotds();
}
function playmotds(){
	let order = 0;
	let motd="";
	setInterval(()=>{//定时器开始
		let connect="",motd="";
		contents.get("motd").forEach(function (currentValue, index) {
			switch (currentValue.type) {
				case "static": {
					motd = motd + replace(currentValue.contents);
					break;
				}
				case "alt": {
					if(!currentValue.random){
						motd = motd + replace(currentValue.contents[order % currentValue.contents.length]);
					}
					else{
						motd = motd + replace(currentValue.contents[Math.floor((Math.random()*currentValue.contents.length))]);
					}
					break;
				}
				case "roll": {
					motd= motd + colorrollslice(currentValue,order);
					//log(motd);
					//motd = motd + replace(currentValue.contents).slice(order%(replace(currentValue.contents).length-2-currentValue.length+1),order%(replace(currentValue.contents).length-2-currentValue.length+1)+currentValue.length);
					break;
				}
				default: {
					log("contents.json的motd类中第" + index + "项的type属性参数无效");
				}
			}
		})
		mc.setMotd(motd);
		order++;
	},conf.get("frequency")+50)	
	
}
function replace(str){
	let replaced="";
	replaced=str.replace(/\$gametime/g,gametimestr()).replace(/\$weather/g,weatherstr())+"§r";
	if(new tps().type!=null){
		replaced=replaced.replace(/\$currenttps/g,new tps().currentTps());
	}
	else{
		replaced=replaced.replace(/\$currenttps/g,"");
	}
	if(new tps().type!=null){
		replaced=replaced.replace(/\$averagetps/g,new tps().averageTps());
	}
	else{
		replaced=replaced.replace(/\$averagetps/g,"");
	}
	if(new mspt().type!=null){
		replaced=replaced.replace(/\$mspt/g,new mspt().get());
	}
	else{
		replaced=replaced.replace(/\$mspt/g,"");
	}
	if(new version().type!=null){
		replaced=replaced.replace(/\$version/g,new version().get());
	}
	else{
		replaced=replaced.replace(/\$version/g,"");
	}
	if(new protocol().type!=null){
		replaced=replaced.replace(/\$protocol/g,new protocol().get());
	}
	else{
		replaced=replaced.replace(/\$protocol/g,"");
	}
	if(new entities().type!=null){
		replaced=replaced.replace(/\$entities/g,new entities().get());
	}
	else{
		replaced=replaced.replace(/\$entities/g,"");
	}
	if(new uptime().type!=null){
		replaced=replaced.replace(/\$uptime/g,new uptime().get());
	}
	else{
		replaced=replaced.replace(/\$uptime/g,"");
	}
	return replaced;
}
function cleanstr(arr){
	let arr1 = [];
	arr.forEach((currentValue)=>{
		if(currentValue!=""&&currentValue!=null){
			arr1.push(currentValue);
		}
	})
	return arr1;
}
function weatherstr(){
	let str = "";
	switch(weather()){
		case 0:str="§r§a晴朗";break;
		case 1:str="§r§9下雨";break;
		case 2:str="§r雷雨";break;
	}	
	return str;
}
function gametimestr(){
	switch (gametime().hour){
		case 3:case 21:timecolor="8";break;
		case 22:case 23:case 0:case 1:case 2:timecolor="0";break;
		case 20:case 4:timecolor="1";break;
		case 5:timecolor="9";break;
		case 6:case 18:case 19:timecolor="3";break;
		case 16:case 17:case 7:timecolor="6";break;
		case 8:timecolor="e";break;
		case 9:case 10:case 11:case 12:case 13:case 14:case 15:timecolor="b";break;
	}
	return "§r§"+timecolor+(gametime().hour-gametime().hour%10)/10+gametime().hour%10+":"+(gametime().minute-gametime().minute%10)/10+gametime().minute%10+"§r";
}
function weather(){
	let weather;
	weather = mc.runcmdEx("weather query");
	if(weather.output=="Weather state is: clear"){
		return 0
	}
	else if(weather.output=="Weather state is: rain"){
		return 1;
	}
	else if(weather.output=="Weather state is: thunder"){
		return 2;
	}
}
function gametime(){
	let timenum=0;
	let time;
	let timestr;
	let timestatus;
	let timeobj={hour:0,minute:0}
	timenum=0;
	time = mc.runcmdEx("time query daytime");
	timestr = time.output.match(/\d/g);
	for(i=0;i<timestr.length;i++){
		timenum = timenum*10;
		timenum = timenum + Number(timestr[i]);
	}
	timeobj.hour=(timenum-timenum%1000)/1000+6
	if(timeobj.hour>=24){timeobj.hour-=24;}
	timeobj.minute=(timenum%1000*3-timenum%1000*3%50)/50	
	return timeobj;
}
function joinconnect(arr){
	let str = "";
	arr.forEach((currentValue)=>{
		str=str+currentValue;
	});
	return str;
}
function papimspt(object){
    for (let key in object){
        if(key == "<1>"){
        return obj[key] + mc.getBDSVersion()
        }
    }
    return "Fail";
}

function colorrollslice(currentValue,order){
	let i;
	let motd = "";
	let rollarr=[],color=[""];
	let fcut=0,fcutarr=0,fcutonstr=0,bcut=0,bcutarr=0,bcutonstr=0,forlength=0;
	connect = "§r"+replace(currentValue.contents);
	//log(connect);
	rollarr = cleanstr(connect.split(/§./g));
	//log(rollarr);
	fcut=order%(joinconnect(rollarr).length-currentValue.length+1);//记录前后切点
	bcut=fcut+currentValue.length;//这里的两个currentValue是配置文件的长度！
	//log(joinconnect(rollarr).slice(fcut,bcut));
	forlength=0;
	for(i=0;i<rollarr.length;i++){//找到前切点所在的字符串和该相对字符串的切点位置
		forlength+=rollarr[i].length;
		if(forlength>fcut){
			fcutarr=i;
			fcutonstr=rollarr[i].length-(forlength-fcut);
			break;
		}						
	}
	forlength=0;
	for(i=0;i<rollarr.length;i++){//找到后切点所在的字符串和相对该字符串的切点位置
		forlength+=rollarr[i].length;
		if(forlength>=bcut){
			bcutarr=i;
			bcutonstr=rollarr[i].length-(forlength-bcut);
			break;
		}						
	}
	for(i=0;i<=connect.length-2;i++){
		if(connect.slice(i,i+2).match(/§./)!=null){
			color[color.length-1]=color[color.length-1]+connect.slice(i,i+2).match(/§./)[0];
			i++;
		}
		else{
			color.push("");
		}
		//log(connect.slice(i,i+2));
	}
	color=cleanstr(color);
	//log(color);
	//log(rollarr[fcutarr].slice(fcutonstr));
	//log(rollarr[bcutarr].slice(0,bcutonstr))
	if(fcutarr!=bcutarr){
		motd = motd + color[fcutarr] + rollarr[fcutarr].slice(fcutonstr);
		for(i=fcutarr+1;i<=bcutarr-1;i++){
			motd = motd + color[i] + rollarr[i];
		}
		if(fcutarr!=bcutarr){
			motd = motd + color[bcutarr] + rollarr[bcutarr].slice(0,bcutonstr);//issue#1问题就出在这了，如果前后切点位于同一字符串，那么就会直接读取开头字符串的值，不对后字符串作处理，那么后字串的处理就不会进行，于是就会看到第一个字符串直接到头
		}		
	}
	else{
		motd = motd + color[fcutarr] + rollarr[fcutarr].slice(fcutonstr,bcutonstr)
	}

	/*else{//这个就是前后切点位于同一字符串的情况，所以直接对motd字符串本身处理，而尽量不再去读取之前的变量
		motd = motd.slice(0,bcutonstr);
	}*/
	motd=motd+"§r";
	return motd;
}
ll.export(weather,"infoMotd","weather")
ll.export(gametime,"infoMotd","time")
let mgrcmd = mc.newCommand("infomotd", " ", PermType.Console);
mgrcmd.setEnum("options",["reload"]);
mgrcmd.mandatory("options",ParamType.Enum, "options");
mgrcmd.overload(["options"]);
mgrcmd.setCallback((cmd,origin,output,results)=>{
	if(results.options=="reload"){
		if(contents.reload()){
			log("motd内容重载完成")
		}
		else{
			log("无法重载motd内容");
		}
		if(conf.reload){
			log("配置文件重载完成");
		}
		else{
			log("无法重载配置文件");
		}
	}
})
mgrcmd.setup();