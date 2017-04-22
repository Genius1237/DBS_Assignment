var db = require('./database');
var xlsx = require('xlsx');
var path=require('path');
function getVal(str,isno)
{
	var i = 0;
	var size = str.length;
	var ans = 0;
	var prod = 1;
	for(i=size-1;i>=0;i--)
	{
		var val = str.charCodeAt(i);
		if(!isno)
		{
			val = val - 64;
			ans = ans + val*prod;
			prod = prod*26;
		}
		else
		{
			//console.log(val);
			val = val - 48;
			ans = ans + val*prod;
			prod = prod*10;
		}
	}
	return ans;
}
function getStr(str,isno)
{
	var i = 0;
	var temp = str;
	var ans = "";
	while(temp>0)
	{
		if(!isno)
		{
			var chr = String.fromCharCode((temp%26)+64);
			ans+=chr;
			temp = Math.floor(temp/26);
		}
		else
		{
			var chr = String.fromCharCode((temp%10)+48);
			ans+=chr;
			temp = Math.floor(temp/10);
		}
	}
	var size = ans.length;
	var answer="";
	for(i=size-1;i>=0;i--)
	{
		answer+=ans[i];
	}
	return answer;
}
function giveType(val)	{
	switch(typeof(val))
	{
		case "number" : return 'n';
		case "string" : return 's';
		case "boolean" : return 'b';
		default : return 's';
	}
	return 's';
}

module.exports=function(res,query1,params1,query2,params2){
	workbook  = { SheetNames:[], Sheets:{} };
	workbook.SheetNames.push('Sell');
	workbook.SheetNames.push('Buy');
	worksheet1 = {};
	worksheet2 = {};
	var connection = db();
	var t=(new Date).getTime();
	connection.query(query1,params1,function(error,results) {
		if(error)
		{
			console.log(error);
			res.sendStatus(404);
		}
		else
		{
			if(results==null || results.length==0)
			{
				var sheet1 = workbook.SheetNames[0];
				workbook.Sheets[sheet1] = worksheet1;
				//res.send("No Results");
			}
			else
			{
				/*for(var i=0;i<results.length;i++)
				{
					console.log(typeof(results[i]._id));
				}*/
				var uy = Object.keys(results[0]).length;
				var ly = 1;
				var lx = 2;
				var ux = results.length;
				//console.log(ux);
				var i=0;
				var j=0;
				worksheet1['!ref'] = getStr(1,false)+getStr(1,true)+":"+getStr(uy,false)+getStr(ux+1,true);
				var count = 1;
				for(var temp in results[0])
				{
					var cell = getStr(count,false)+getStr(1,true);
					count++;
					var obj = {};
					//console.log(v+" "+giveType(results[0][temp]));
					obj.t = 's';
					obj.v = temp;
					obj.w = temp;
					worksheet1[cell] = obj;
				}
				var size = results.length;
				for(i=0;i<size;i++)
				{
					count = 1;
					for(var temp in results[i])
					{
						var cell = getStr(count,false)+getStr(i+2,true);
						var obj = {};
						obj.t = giveType(results[0][temp]);
						obj.v = results[i][temp];
						obj.w = results[i][temp];
						worksheet1[cell] = obj;
						count++;
					}
				}
				//console.log(worksheet1);
				var sheet1 = workbook.SheetNames[0];
				workbook.Sheets[sheet1] = worksheet1;
				//xlsx.writeFile(workbook,path.join(__dirname,'../public/xlsx/')+t+'.xlsx');
				//console.log(workbook.Sheets);
				//res.sendFile(path.join(__dirname,'../public/xlsx/')+t+'.xlsx');
			}
			connection.query(query2,params2,function(error,results) {
				if(error)
				{
					console.log(error);
					res.sendStatus(404);
				}
				else
				{
					if(results==null || results.length==0)
					{
						var sheet1 = workbook.SheetNames[1];
						workbook.Sheets[sheet1] = worksheet2;
						//res.send("No Results");
					}
					else
					{
						var uy = Object.keys(results[0]).length;
						var ly = 1;
						var lx = 2;
						var ux = results.length;
						//console.log(ux);
						var i=0;
						var j=0;
						worksheet2['!ref'] = getStr(1,false)+getStr(1,true)+":"+getStr(uy,false)+getStr(ux+1,true);
						var count = 1;
						for(var temp in results[0])
						{
							var cell = getStr(count,false)+getStr(1,true);
							count++;
							var obj = {};
							//console.log(v+" "+giveType(results[0][temp]));
							obj.t = 's';
							obj.v = temp;
							obj.w = temp;
							worksheet2[cell] = obj;
						}
						var size = results.length;
						for(i=0;i<size;i++)
						{
							count = 1;
							for(var temp in results[i])
							{
								var cell = getStr(count,false)+getStr(i+2,true);
								var obj = {};
								obj.t = giveType(results[0][temp]);
								obj.v = results[i][temp];
								obj.w = results[i][temp];
								worksheet2[cell] = obj;
								count++;
							}
						}
						//console.log(worksheet2);
						var sheet1 = workbook.SheetNames[1];
						workbook.Sheets[sheet1] = worksheet2;
						//
						//xlsx.writeFile(workbook,path.join(__dirname,'../public/xlsx/')+t+'.xlsx');
						//console.log(workbook.Sheets);
						//
					}
					xlsx.writeFile(workbook,path.join(__dirname,'../public/xlsx/')+t+'.xlsx');
					res.sendFile(path.join(__dirname,'../public/xlsx/')+t+'.xlsx');
				}
			});
		}
		//console.log(workbook);
	});
};