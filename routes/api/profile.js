const express = require("express");
const router = express.Router();
const passport = require("passport");

const Profile = require("../../models/Profile")

// @route GET api/profile/test
// @desc 返回请求的json数据
// @access public
router.get('/test',(req,res)=>{
  res.json({msg:'profile works'})
}) 

// @route POST api/profile/add
// @desc 添加信息接口
// @access Private
router.post('/add',passport.authenticate('jwt',{session: false}),(req,res)=>{
  const profileFields = {};

  if(req.body.type) profileFields.type = req.body.type;
  if(req.body.description) profileFields.description = req.body.description;
  if(req.body.income) profileFields.income = req.body.income;
  if(req.body.expend) profileFields.expend = req.body.expend;
  if(req.body.cash) profileFields.cash = req.body.cash;
  if(req.body.remark) profileFields.remark = req.body.remark;

  new Profile(profileFields).save().then(profile=>{
    res.json(profile)
  }).catch(err=>{
    console.log(err)
  });
}) 

// @route GET api/profile
// @desc 获取所有信息
// @access Private
router.get('/',passport.authenticate('jwt',{session: false}),(req,res)=>{
  Profile.find()
         .then(profile=>{
            if(!profile){
              return res.status(404).json("没有任何内容")
            }
            res.json(profile);
         }).catch(err=>{
            res.status(404).json(err);
         });
})

// @route GET api/profile/:id
// @desc 获取单个信息
// @access Private
router.get('/:id',passport.authenticate('jwt',{session: false}),(req,res)=>{
  Profile.findOne({_id:req.params.id})
         .then(profile=>{
            if(!profile){
              return res.status(404).json("没有任何内容")
            }
            res.json(profile);
         }).catch(err=>{
            res.status(404).json(err);
         });
})

// @route POST api/profile/edit/:id
// @desc 编辑信息接口
// @access Private
router.post('/edit/:id',passport.authenticate('jwt',{session: false}),(req,res)=>{
  const profileFields = {};

  if(req.body.type) profileFields.type = req.body.type;
  if(req.body.description) profileFields.description = req.body.description;
  if(req.body.income) profileFields.income = req.body.income;
  if(req.body.expend) profileFields.expend = req.body.expend;
  if(req.body.cash) profileFields.cash = req.body.cash;
  if(req.body.remark) profileFields.remark = req.body.remark;

  Profile.findOneAndUpdate(
    {_id: req.params.id},
    {$set: profileFields},
    {new: true}
  ).then(profile=>{
    res.json(profile)
  }).catch(err=>{
    res.status(404).json("编辑失败")
  });
}) 

// @route DELETE api/profile/delete/:id
// @desc 删除信息接口
// @access Private
router.delete('/delete/:id',passport.authenticate('jwt',{session: false}),(req,res)=>{
  Profile.findOneAndDelete(
    {_id: req.params.id}
  ).then(profile=>{
    profile.save().then(profile => res.json(profile))
  }).catch(err=>{
    res.status(404).json("删除失败")
  });
}) 

module.exports = router;