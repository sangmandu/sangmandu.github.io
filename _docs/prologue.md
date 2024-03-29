<!-- ---
layout: default
title: Prologue
nav_order: 1
--- -->

정말 여러 블로그를 써봤다. 네이버, 다음부터 시작해서 티스토리, 벨로그, 깃북, 노션 등등. 제일 맘에 들었던 것은 깃북이었다. 그렇지만, 한글 패치와 각종 버그에 대한 스트레스로 결국 포스팅을 접게되었다. 가끔 포스팅을 하고 싶은 마음이 근질거리기도 했고, 몇몇 정보들은 꼭 기록해두고 싶어서 벨로그나 노션등을 건드려보았지만, 바로 줄곧 포기하고 말았다. 다들 나랑은 잘 안맞았다. 깃허브 아이오는 찍먹은 해봤지만, 뭔가 프론트 개발자가 된 것 같은 느낌이 물씬 들어서 피하려고 했는데, 결국에는 굽이굽이 마지막에 오게되었다. 완벽주의 성향이 있는지라 내가 사용하고 있는 블로그의 기능을 완벽히 파악하지 못하면 블로깅에 대한 자존감을 잃어간다. 그래서 오늘부터 그 기능들을 하나씩 파악해가려고 한다.

내가 선택한 테마는 [Just the Docs](https://just-the-docs.github.io/just-the-docs/)라는 테마이다. 이걸 고른 이유는 그래도 한 때 애정있었던 깃북 테마와 거의 유사하기 때문이다. 그 한 때의 내 [깃북](https://sangmandu.gitbook.io/til/)은 여기있다. 나름 자체 버전관리와 패치로그까지 작성해가며 애정을 줬다. 각설하고, 테마에서 설명해주는 기능등을 조금씩 야금야금 배워나가 보자!

일단 이 프롤로그부터 잘 포스팅해야 될 것이다. 아래와 같이 카테고리가 이루어져 있었고, 그에 대한 내용들은 `docs`라는 폴더안에 존재했다. 또, 각 디렉토리 구조를 따르게 해서 각 컨텐츠들을 포함관계로 말할 수 있었다.

<div>
  <img src="https://user-images.githubusercontent.com/45033215/206067134-ee637d19-5991-4aa2-aef9-6a609f2790de.png" height=300>
  <img src="https://user-images.githubusercontent.com/45033215/206067279-92f5c8bc-bf51-43c9-b631-28f7e8856afa.png" height=300>
</div>
  
각 파일들은 상단에 아래와 같이 명시되어 있는 규칙이 있었다. 마크다운 파일 이름과 다르게 title이라는 곳에 적은 이름이 실제 블로그에서 보이는 카테고리 이름이 되는 것 같았고 nav_order는 위에서부터 보여지는 순서인 것 같다. 아니 그러면 매번 nav_order를 일일이 정해주어야 하고, 중간에 새로운 글을 추가하려면 기존 글들의 순서를 일일이 수정해줘야 하는건가...? 전혀 개발자같지 않은 방법이기에 무언가 방법이 있지 않을까 추측해본다.

![image](https://user-images.githubusercontent.com/45033215/206067606-8d72f510-5428-454d-ae62-795484028f6d.png)

단순히 마크다운 파일이 작성되었다고 블로그에서 보여지지는 않았다. 어느정도 기본 포맷이 작성되어 있어야 되나보다 싶다. 이 프롤로그를 nav_order=2 로 설정하면 어떻게 될까?? 에러가 날까? 아니면 뒤에 글들이 모두 자동으로 밀릴까?
