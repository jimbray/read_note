Ant

Apache Ant，是一个将软件编译、测试、部署等步骤联系在一起加以自动化的一个工具，大多用于Java环境中的软件开发。由Apache软件基金会所提供。默认情况下，它的buildfile(XML文件)名为build.xml。每一个buildfile含有一个<project>和至少一个默认的<target>，这些targets包含许多task elements。每一个task element有一个用来被参考的id，此id必须是唯一的。[1] 



目录
 [隐藏] 1 build.xml
2 示例 2.1 jar
2.2 war
2.3 apk

3 参考文献

build.xml[编辑]
<project name="ant" default="all">
设置build项目名，设置默认执行的target

 <description>
 一段描述和说明
 </description>

 <target name="all" depends="version, print, clean, compile, sleep, test, jar" />
设置target的依赖关系，按顺序执行

 <target name="version" if="ant.java.version">
       <echo message="Java Version: ${ant.version}" />
   </target>

 <target name="clean">
 删除根目录下target 目录
      <delete dir="target" quiet="true" />
 </target>

  <target name="compile">编译程序，创建目录并编译程序，编译输出为target/classes目录下
      <mkdir dir="target/classes"/>
      <javac srcdir="src" destdir="target/classes"/>
  </target>

  <target name="sleep">在创建前等待60秒，用于Dashboard观察进程
      <echo message="Sleeping for a while so you can see the build in the new dashboard" />
      <sleep seconds="60" />
  </target>

  <target name="test" depends="compile">进行自动化测试，依赖任务为compile
      <mkdir dir="target/test-classes"/>
      <javac srcdir="test" destdir="target/test-classes">
          <classpath>
              <pathelement location="target/classes"/>
              <pathelement location="lib/junit.jar"/>
          </classpath>
      </javac>

      <mkdir dir="target/test-results"/>创建测试结果存放目录
      <junit haltonfailure="no" printsummary="on">
          <classpath >
              <pathelement location="target/classes"/>
              <pathelement location="lib/junit.jar"/>
              <pathelement location="target/test-classes"/>
          </classpath>
          <formatter type="brief" usefile="false"/>
          <formatter type="xml" />
          <batchtest todir="target/test-results" >测试文件所在文件地址
              <fileset dir="target/test-classes" includes="**/*Test.class"/>
          </batchtest>
      </junit>
  </target>

  <target name="jar" depends="compile">程序打包，依赖与compile任务
      <jar jarfile="target/connectfour.jar" basedir="target/classes"/>
  </target>
</project>


示例[编辑]

jar[编辑]
<project name="connectfour" default="all">调用Ant执行集成流程，包括清空目录、编译、休眠、测试、打包
   <target name="all" depends="clean, compile, sleep, test, jar"/>
   <target name="clean">删除根目录下target 目录
       <delete dir="target" quiet="true" />
   </target>
   <target name="compile">编译程序，创建目录并编译程序，编译输出为target/classes目录下
       <mkdir dir="target/classes"/>
       <javac srcdir="src" destdir="target/classes"/>
   </target>
   <target name="sleep">在创建前等待60秒，用于Dashboard观察进程
       <echo message="Sleeping for a while so you can see the build in the new dashboard" />
       <sleep seconds="60" />
   </target>
   <target name="test" depends="compile">进行自动化测试，依赖任务为compile
       <mkdir dir="target/test-classes"/>
       <javac srcdir="test" destdir="target/test-classes">
           <classpath>
               <pathelement location="target/classes"/>
               <pathelement location="lib/junit.jar"/>
           </classpath>
       </javac>
       <mkdir dir="target/test-results"/>创建测试结果存放目录
       <junit haltonfailure="no" printsummary="on">
           <classpath >
               <pathelement location="target/classes"/>
               <pathelement location="lib/junit.jar"/>
               <pathelement location="target/test-classes"/>
           </classpath>
           <formatter type="brief" usefile="false"/>
           <formatter type="xml" />
           <batchtest todir="target/test-results" >测试文件所在文件地址
               <fileset dir="target/test-classes" includes="**/*Test.class"/>
           </batchtest>
       </junit>
   </target>
   <target name="jar" depends="compile">程序打包，依赖与compile任务
       <jar jarfile="target/connectfour.jar" basedir="target/classes"/>
   </target>
</project>


war[编辑]

apk[编辑]

android apk 的打包非常简单，首先执行 PATH/sdk/tools/android update project -p <project> -t <target> ，target为项目所使用的android的target id，可以通过android list targets查询sdk支持的target，执行完android update project命令后，会在项目的根目录下生成三个文件： 

build.xml 进行ant build的主要文件，它引用了sdk自带的build.xml； 

local.properties 定义了sdk.dir属性，也就是当前的sdk的目录； 

project.properties 定义了库工程的依赖关系。 

在项目根目录新建ant.properties文件设置私钥路径和密码 
# vi ant.properties
key.store=
key.store.password=
key.alias=
key.alias.password=


key.store为私钥库文件；key.alias为签名需要使用的私钥。 

最后修改项目build.xml的默认target为release，这样在用 ant 进行打包时就可以自动签名。 
