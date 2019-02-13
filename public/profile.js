$(document).ready(function(){

  let _members = $('.members');
  console.log(_members);
  $.ajax({
    method:'GET',
    url:'/users/'
  })
  .done((data)=>{
    console.log('data: ',data);
    data.forEach(member => {
      let memberDiv = document.createElement('div');
      let memberName = document.createElement('h4');
      let memberPic = document.createElement('div');
      $(memberDiv).addClass('member');
      $(memberPic).addClass('member__pic');

      $(memberName).addClass('member__name').text(member.display_name)
      $(memberDiv).append(memberPic,memberName);
      $(_members).append(memberDiv);
    });
  })
  .fail((err)=>{
    console.log('err')
  })
})