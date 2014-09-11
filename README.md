messagebar.js
=============
This is a plugin for alerting info.

### Usage

#### include:  
``` html
<script src="messagebar.js"></script>
```

#### usage:  
messagebar can be used in the ways shown below
``` js
messagebar.alert(message);
messagebar.alert(message, preventAutoClosing);
messagebar.alert(option);
```
**Notice:** The variable message is a string you want to alert, then preventAutoClosing means that if you need to click a closing button by yourself to have it disappear. The 3rd line recieve an object to be the arguments, we expect the object to be formatted as below, or you will get an error.  
**option format:**
``` js
{
  // string: the message you want to show
  message: 'you have not input any message',
  // string: a string only include one of left or right and one of up and down, a space to split
  position: 'right top',
  // number: a time delay after which the messagebar will show
  delay: 0, 
  // number: if property 'pause' is false, the messagebar will disappear after this time
  time: 3000,
  // boolean: control that if you need to click a closing button by yourself to have it disappear
  pause: false
}
```
**tips:** the values of every property of option will be set if you ignore it. That is to say, you can offer any number propertys of the option, if you want to use the default value.

#### Demo
[Here is a demo](http://yedeying999.github.io/sites/messagebar)