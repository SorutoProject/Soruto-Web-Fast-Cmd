var swfCmd = new Object;

swfCmd.appRun = function (c) {
	var arg = c.split(" ");

	var xhr = new XMLHttpRequest();
	xhr.open('GET', "app/" + arg[0] + ".json", true);
	xhr.onreadystatechange = function () {
		// 本番用
		if (xhr.readyState === 4 && xhr.status === 200) {
			swfCmd.run(xhr.responseText, arg);
		}
		// ローカルファイル用
		if (xhr.readyState === 4 && xhr.status === 0) {
			swfCmd.run(xhr.responseText, arg);
		}
	};
	xhr.send(null);
}

swfCmd.run = function (j, arg) {
	var code = JSON.parse(j);
	if (!arg[1]) {
		console.log("コマンド関数名が入力されていません");
	} else if (code[arg[1]]) {
		var funcName = code[arg[1]].command;

		//置き換えコードを置き換え
		for (var i = 0; i < arg.length; i++) {
			var funcName = funcName.split("$arg-" + i).join(arg[i]);
		}

		var searchQuery = [];
		for (var i = 2; i < code.length; i++) {
			searchQuery.push(code[i]);
		}

		//var funcName = funcName.split("$arg-q").join(searchQuery.join(" "));

		console.log(funcName);

		var funcFirstSpace = funcName.indexOf(" ");
		var funcFunc = funcName.slice(0, funcFirstSpace);
		var funcArg = funcName.slice(funcFirstSpace, funcName.length);


		console.log(funcArg);

		swfCmd.commandRun(funcFunc, funcArg);

	} else {
		if (code["$else"]) {
			var funcName = code["$else"].command;

			//置き換えコードを置き換え
			for (var i = 0; i < arg.length; i++) {
				var funcName = funcName.split("$arg-" + i).join(arg[i]);
			}

			var searchQuery = [];
			for (var i = 2; i < arg.length; i++) {
				searchQuery.push(arg[i]);
			}
			console.dir(searchQuery);
			//var funcName = funcName.split("$arg-q").join(searchQuery.join(" "));

			console.log(funcName);

			var funcFirstSpace = funcName.indexOf(" ");
			var funcFunc = funcName.slice(0, funcFirstSpace);
			var funcArg = funcName.slice(funcFirstSpace, funcName.length);


			console.log(funcArg);

			swfCmd.commandRun(funcFunc, funcArg);
		} else {
			console.log("指定された関数名が見つからないため、$elseを実行しようとしましたが、見つかりませんでした");
		}
	}
}

swfCmd.commandRun = function (funcFunc, funcArg) {
	//処理を定義
	if (funcFunc == "move") {
		location.href = funcArg;
	}
}
