export const validation = [
	{
		required: "名前は必須",
		minLength: {
			value: 3,
			message: "3文字以上で入力してください",
		},
	},
	{
		required: "emailは必須",
		pattern: {
			value: /^[a-zA-Z0-9_+-]+(.[a-zA-Z0-9_+-]+)*@([a-zA-Z0-9][a-zA-Z0-9-]*[a-zA-Z0-9]*\.)+[a-zA-Z]{2,}$/,
			message: "入力形式がメールアドレスではありません。",
		},
	},
	{
		required: "passwordは必須",
		minLength: {
			value: 6,
			message: "6文字以上で入力してください",
		},
	},
	{
		required: "自己紹介",
		minLength: {
			value: 10,
			message: "10文字以上で入力してください",
		},
	},
];
