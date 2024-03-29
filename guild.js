
const mongoose = require('mongoose');
const prefix = new mongoose.Schema({
	id: String,
	prefix: { type: String, default: '.' },
	cv: String,
	cvc: String,
	parent: String,
	online: String,
	members: String,
bt:String,
rec:String,
ecc:{ type: Array, default: 'off' },
	wl: { type: String, default: 'нет' },
	welc: { type: String },
	lv: { type: String, default: 'нет' },
	mt : { type: String, default: null },
	ms: { type: String, default: 'off' },
	leave: { type: String },
	color: { type: String, default: '#000000' }, //#000000
	wlimage: { type: String, default: null },
	lvimage: { type: String, default: null },
	prem: String,
	val : String,
	lgc:Array,
	ec:{ type: String, default: 'off' },
	mod: { type: String, default: 'on' },
	moz: { type: String, default: 'on' },
	vt: { type: String, default: 'on' },
	nsfw: { type: String, default: 'on' },
	rp: { type: String, default: 'on' },
	volume: { type: Number, default: 100},
	game : { type: String, default: 'on' },
	embedimage: String,
	embedcolor : { type: String, default: '#000000' },
	embedtitle: String,
	embeddescription: String,
	premt:String,
bon:String,
	//2F3136
	emb : { type: String, default: '2F3136' },
	rl: String,
	
	topvoice:String,
	member: String,
	wemb:String,
	lemb:String,
	offline: String,
	log: String,
	timely_date:Number,
	timely_work:Number,
	logs : String,
	morelogs: String,
	modrole: Array,
	parent5:String,
	onec: String,
	idea: String,
	orole: Array,
	messagereward: {type:Number,default:null},
	sayrole:Array,
	invite: String,
	slots_min: Number,
	slots_max: Number,
	roulette_min: Number,
	roulette_max:Number,
	lvls: { type: String, default: 'off' },
	say: { type: String, default: 'on' },
	multiplier: Number,
	blockc: Array,
	badc:Array,
	badword: String,
	badwords: Array,
	rankimage:String,
	ymn: String,
	cc:String,
	gc:String,
	wt:String,
	lt:String,
	rankcolor:String,
	gp:Number,
	gp2:Number,
	ch1: String,
	ch2: String,
	wft: String,
	wlv: String,
	toponline: String,
	topoffline: String,
	topmembers: String,
	parent1: String,
	parent2: String,
	warnslimit: Number,
	nk : String,
	warns: Number,
  privat_channel:String,
  lcolor:String,
  wcolor:String,
  lvlrole:{type:Array,default:[]},
  lvlrole_num:{type:Array,default:[]},
  timely:Number,
  report_c:String,
  dop_item1:Number,
  dop_item2:Number,
  marry_parent:String,
});

module.exports = mongoose.model('prefixs', prefix);

