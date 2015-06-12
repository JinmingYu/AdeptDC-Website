close all; clear all; clc;

type=menu('Workload Type:','Cloud', 'Batch', 'Enterprise', 'HPC');
switch type
    case 1
        data=xlsread('wilee');
        flag=1;
    case 2
        data=xlsread('step');
        flag=2;
    case 3
        data=xlsread('stepsine');
        flag=3;
    case 4
        data=xlsread('real');
        flag=4;
        %modification due to POD preprocessor error
        data(1:6,2)=29;
        data(1:6,3)=4;
end;

if (flag==1)
    CRAC_Cost=[100;48];
    CRAC_Saving='52% Operating Cost Saving for CRAC';
    RDHx_Cost=[100;82];
    RDHx_Saving='18% Operating Cost Saving for RDHx';
elseif (flag==2)
    CRAC_Cost=[100;37];
    CRAC_Saving='63% Operating Cost Saving for CRAC';
    RDHx_Cost=[100;66];
    RDHx_Saving='34% Operating Cost Saving for RDHx';
elseif (flag==3)
    CRAC_Cost=[100;34];
    CRAC_Saving='66% Operating Cost Saving for CRAC';
    RDHx_Cost=[100;81];
    RDHx_Saving='19% Operating Cost Saving for RDHx';
elseif (flag==4)
    CRAC_Cost=[100;86];
    CRAC_Saving='14% Operating Cost Saving for CRAC';
    RDHx_Cost=[100;90];
    RDHx_Saving='10% Operating Cost Saving for RDHx';
end

subplot(2,2,1:2)
time=data(:,1);
crac_sup=data(:,2);
rdhx_pre=data(:,3);

if (flag==1)
plot(time,1)
axis([0 3000 0 100])
%Flash Crowd
flash.t1=2400;
flash.t2=2430;
flash.t3=2460;
flash.t4=2520;
flash.cm=90;
% Regular Sine
wave.period=3600;
wave.amp=25;
wave.offset=35;
wave.sample_t=72;
y=[];
i=0;
for t=0:wave.sample_t:flash.t1
   
    y=[y, wave.offset+wave.amp*sin((2*pi/wave.period)*t)];
    
end;
 y=[y, wave.offset+wave.amp*sin((2*pi/wave.period)*flash.t1)];
 y=[y,90, 90];
 
  
 for t=flash.t4:wave.sample_t:wave.period-600
     
     y=[y, wave.offset+wave.amp*sin((2*pi/wave.period)*t)];
     
 end;
time=[0:wave.sample_t:flash.t1, flash.t1, flash.t2, flash.t3, flash.t4:wave.sample_t:wave.period-600];
p=plot(time,y, 'ks-');
set(p,'markerfacecolor', 'k');
axis ([0 3000 0 100])
set(gcf, 'color', [1 1 1]);
set(gca, 'xtick', [0;450;900;1350;1800;2400;2520;3000], 'XTickLabel', {'0';'0.15T';'0.3T';'0.45T';'0.6T';'0.8T';'0.84T';'T'},'fontname', 'arial','fontsize',14);
set(gca,'ytick',[0:20:100],'fontname','arial','fontsize',14);
text(1000,40, 'Periodic Component\rightarrow','fontname','arial', 'fontsize', 16)
text(2100,80, 'Flash Crowd\rightarrow','fontname','arial', 'fontsize', 16)
title(strcat('Transient IT Utilization Profile (%) for Cloud Workload'), 'fontname', 'arial', 'fontsize', 16);
%xlabel('Time (s)','fontname','arial', 'fontsize', 16);
% ylabel ('CPU Utilization (%)','fontname','arial', 'fontsize', 12);

elseif (flag==2)
    del_t=600;
low=10;high=80;
sample=72;
for t=0:sample:5*(del_t)
    n=0;
    if (t>n*del_t)&(t<=(n+1)*del_t)
    plot(t,low,'ks-','markerfacecolor','k');
    hold on
    elseif (t>(n+1)*del_t)&(t<=(n+2)*del_t)
    plot(t,high,'ks-','markerfacecolor','k');
    hold on
    elseif (t>(n+2)*del_t)&(t<=(n+3)*del_t)
    plot(t,low,'ks-','markerfacecolor','k');
    hold on
    elseif (t>(n+3)*del_t)&(t<=(n+4)*del_t)
    plot(t,high,'ks-','markerfacecolor','k');
    hold on
    elseif (t>(n+4)*del_t)&(t<=(n+5)*del_t)
    plot(t,low,'ks-','markerfacecolor','k');
    hold on
    end;
end;
axis([0 3000 0 100])
set(gcf,'color',[1 1 1])

line([0 600],[low low],'Color','k')
line([600 600],[low high],'Color','k')

line([600 1200],[high high],'Color','k')
line([1200 1200],[high low],'Color','k')


line([1200 1800],[low low],'Color','k')
line([1800 1800],[low high],'Color','k')

line([1800 2400],[high high],'Color','k')
line([2400 2400],[high low],'Color','k')

line([2400 3000],[low low],'Color','k')

set(gca, 'xtick', [0:600:3000], 'XTickLabel', {'0';'0.2T';'0.4T';'0.6T';'0.8T';'T'},'fontname', 'arial','fontsize',12)
title('Transient IT Utilization Profile (%) for Batch Workload', 'fontname', 'arial', 'fontsize', 16);
% title('Type-2', 'fontname','arial', 'fontsize', 20);
set(gca, 'xtick', [0:600:3000],'fontname', 'arial','fontsize',14)
set(gca, 'ytick', [10:35:80],'fontname', 'arial','fontsize',14)
%xlabel('Time (s)','fontname','arial', 'fontsize', 16);
elseif(flag==3)
 del_t=600;
low=35;high=60;
sample=72;
y=[];
offset=35;amp=25;period=3600;
for t=3*(del_t):sample:5*(del_t)
  y=[y, offset+amp*sin((2*pi/period)*t)];
end;

for t=0:sample:3*(del_t)
    n=0;
    if (t>n*del_t)&(t<=(n+1)*del_t)
    plot(t,low,'ks-','markerfacecolor','k');
    hold on
    elseif (t>(n+1)*del_t)&(t<=(n+2)*del_t)
    plot(t,high,'ks-','markerfacecolor','k');
    hold on
    elseif (t>(n+2)*del_t)&(t<=(n+3)*del_t)
    plot(t,low,'ks-','markerfacecolor','k');
    hold on
    end;
end;
axis([0 3000 0 70])
set(gcf,'color',[1 1 1])
line([0 600],[low low],'Color','k')
line([600 600],[low high],'Color','k')
line([600 1200],[high high],'Color','k')
hold on
t=3*(del_t):sample:5*(del_t);
plot(t,y,'ks-','markerfacecolor','k');

line([1200 1200],[high low],'Color','k')
line([1200 1800],[low low],'Color','k')
set(gca, 'xtick', [0:600:1800,2700,3000], 'XTickLabel', {'0';'0.2T';'0.4T';'0.6T';'0.9T';'T'},'fontname', 'arial','fontsize',12)
set(gca, 'ytick', [10:25:60],'fontname', 'arial','fontsize',14)

title('Transient IT Utilization Profile (%) for Enterprise Workload', 'fontname', 'arial', 'fontsize', 16);
%title('Type-3', 'fontname','arial', 'fontsize', 20);
else
    workload=load('matlab.mat');
t=double(workload.tsnew);
cpu=double(workload.cpunew);
mem=double(workload.memnew);
cpu_norm=(cpu./7972)*100;
mem_norm=(mem./2048)*100;
plot(t,cpu_norm, 'ks-', 'markerfacecolor','k');
axis ([0 3000 -5 105]);
 set(gca, 'xtick', [0;280;1500;3000], 'XTickLabel', {'0';'0.1T';'0.5T';'T'},'fontname', 'arial','fontsize',12); 
set(gca, 'ytick', [10:40:90],'fontname', 'arial','fontsize',14);
%  xlabel('Time (s)','fontname','arial', 'fontsize', 16);
title('Transient IT Utilization Profile (%) for HPC Workload', 'fontname', 'arial', 'fontsize', 16);
% title('Type-4', 'fontname','arial', 'fontsize', 20);
end;


subplot(2,2,3)
X=[0, 3000];
Y=[min(crac_sup),min(crac_sup)];
    
plot(time,crac_sup, 'go-','linewidth',3);
hold on
plot(time,min(crac_sup)*ones(length(time),1), 'ro-','linewidth',3);
legend('Opitmal','Peak','location','southoutside','orientation','horizontal');
axis([0 3000 17 31])
set(gcf,'color', [1 1 1]);
if (flag==1)
    set(gca, 'xtick', [0;450;900;1350;1800;2400;3000], 'XTickLabel', {'0';'0.15T';'0.3T';'0.45T';'0.6T';'0.8T';'T'},'fontname', 'arial','fontsize',12 );
elseif (flag==2)
   set(gca, 'xtick', [0:600:3000], 'XTickLabel', {'0';'0.2T';'0.4T';'0.6T';'0.8T';'T'},'fontname', 'arial','fontsize',12);
elseif(flag==3)
    set(gca, 'xtick', [0:600:1800,2700,3000], 'XTickLabel', {'0';'0.2T';'0.4T';'0.6T';'0.9T';'T'},'fontname', 'arial','fontsize',12);
elseif (flag==4)
     set(gca, 'xtick', [0;280;1500;3000], 'XTickLabel', {'0';'0.1T';'0.5T';'T'},'fontname', 'arial','fontsize',12,'ticklength',[0,0]);
end;
set(gca, 'ytick', 17:2:31);
set(gca, 'fontname', 'arial','fontsize',14);
% title(CRAC_Saving,'fontname','arial', 'fontsize', 16, 'backgroundcolor','y');

 title('Transient Supply Air Temperature ( ^0C) for CRAC unit', 'fontname', 'arial', 'fontsize', 16);

% xlabel('Time (s)', 'fontname', 'arial', 'fontsize', 16);
% ylabel('CRAC Supply Temp (^0C)', 'fontname', 'arial', 'fontsize', 16);
if (flag==1)
    line([900 900], [17 31],'color','k','linestyle', ':');
    line([1800 1800], [17 31],'color','k','linestyle', ':');
    line([2400 2400], [17 31],'color','k','linestyle', ':');
    line([2520 2520], [17 31],'color','k','linestyle', ':');
   
elseif (flag==2)
    line([600 600], [17 31],'color','k','linestyle', ':');
    line([1200 1200], [17 31],'color','k','linestyle', ':');
    line([1800 1800], [17 31],'color','k','linestyle', ':');
    line([2400 2400], [17 31],'color','k','linestyle', ':');
%     line ([0 3000], [min(crac_sup),min(crac_sup)], 'color', 'k','linewidth',3);
elseif (flag==3)
    line([600 600], [17 31],'color','k','linestyle', ':');
    line([1200 1200], [17 31],'color','k','linestyle', ':');
    line([1800 1800], [17 31],'color','k','linestyle', ':');
    line([2700 2700], [17 31],'color','k','linestyle', ':');
%     line ([0 3000], [min(crac_sup),min(crac_sup)], 'color', 'k','linewidth',3);
elseif (flag==4)
    line([300 300], [17 31],'color','k','linestyle', ':');
%     line ([0 3000], [min(crac_sup),min(crac_sup)], 'color', 'k','linewidth',3);
end;


subplot(2,2,4) 
Y=[max(rdhx_pre),max(rdhx_pre)];
plot(time,rdhx_pre, 'go-','linewidth',3);
hold on
plot(time,max(rdhx_pre)*ones(length(time),1), 'ro-','linewidth',3);


axis([0 3000 0 12])
set(gcf,'color', [1 1 1]);
if (flag==1)
    set(gca, 'xtick', [0;450;900;1350;1800;2400;3000], 'XTickLabel', {'0';'0.15T';'0.3T';'0.45T';'0.6T';'0.8T';'T'},'fontname', 'arial','fontsize',12 );
elseif (flag==2)
    set(gca, 'xtick', [0:600:3000], 'XTickLabel', {'0';'0.2T';'0.4T';'0.6T';'0.8T';'T'},'fontname', 'arial','fontsize',12);
elseif(flag==3)
   set(gca, 'xtick', [0:600:1800,2700,3000], 'XTickLabel', {'0';'0.2T';'0.4T';'0.6T';'0.9T';'T'},'fontname', 'arial','fontsize',12);
elseif (flag==4)
    set(gca, 'xtick', [0;280;1500;3000], 'XTickLabel', {'0';'0.1T';'0.5T';'T'},'fontname', 'arial','fontsize',12,'ticklength',[0,0]);
end;
set(gca, 'fontsize',14);
% xlabel('Time (s)','fontname','arial', 'fontsize', 16);
legend('Opitmal','Peak','location','southoutside','orientation','horizontal');
title('Transient Cooling Water Pressure (psi) for RDHx Unit', 'fontname', 'arial', 'fontsize', 16);
% ylabel('RDHx Pressure (psi)', 'fontname', 'arial', 'fontsize', 16);
if (flag==1)
    line([900 900], [0 12],'color','k','linestyle', ':');
    line([1800 1800], [0 12],'color','k','linestyle', ':');
    line([2400 2400], [0 12],'color','k','linestyle', ':');
    line([2520 2520], [0 12],'color','k','linestyle', ':');
%     line ([0 3000], [max(rdhx_pre),max(rdhx_pre)], 'color', 'k','linewidth',3);
elseif (flag==2)
    line([600 600], [0 12],'color','k','linestyle', ':');
    line([1200 1200], [0 12],'color','k','linestyle', ':');
    line([1800 1800], [0 12],'color','k','linestyle', ':');
    line([2400 2400], [0 12],'color','k','linestyle', ':');
%     line ([0 3000], [max(rdhx_pre),max(rdhx_pre)], 'color', 'k','linewidth',3);
elseif (flag==3)
    line([600 600], [0 12],'color','k','linestyle', ':');
    line([1200 1200], [0 12],'color','k','linestyle', ':');
    line([1800 1800], [0 12],'color','k','linestyle', ':');
    line([2700 2700], [0 12],'color','k','linestyle', ':');
%     line ([0 3000], [max(rdhx_pre),max(rdhx_pre)], 'color', 'k','linewidth',3);
elseif (flag==4)
    line([280 280], [0 12],'color','k','linestyle', ':');
    
end;


cons_crac_sup=min(crac_sup);
crac_sup_base=35;
for i=1:length(crac_sup)
    crac_energy_fraction(i)=((1-(crac_sup(i)/crac_sup_base))^3)/((1-(cons_crac_sup/crac_sup_base))^3);
end;
crac_energy_fraction=100*crac_energy_fraction';
rdhx_pre=data(:,3);
cons_rdhx_pre=max(rdhx_pre);
for i=1:length(rdhx_pre)
    rdhx_energy_fraction(i)=((rdhx_pre(i))^1.5)/((cons_rdhx_pre)^1.5);
end;
rdhx_energy_fraction=100*rdhx_energy_fraction';

% subplot(3,2,3) 
% %  h1=area(time,crac_energy_fraction);
% %  set(h1,'facecolor','g');
% %  hold on
% plot(time,crac_energy_fraction, 'ro-','linewidth',2,'markersize',10);
% axis([0 3000 0 100])
% set(gcf,'color', [1 1 1]);
% %set(gca,'yticklabel',[0;25;50;75;100]);
% set(gca, 'fontsize',14);
% title('(b) Transient CRAC Energy Usage Fraction (%)', 'fontname', 'arial', 'fontsize', 16);
% % xlabel('Time (s)', 'fontname', 'arial', 'fontsize', 16);
% % ylabel('CRAC Energy Usage Fraction (%)', 'fontname', 'arial', 'fontsize', 16);
% 
% %  h2=area (time,100*length(time));
% %  set(h2,'facecolor','r');
% if (flag==1)
%     set(gca, 'xtick', [0:600:3000],'fontname', 'arial','fontsize',14,'ticklength',[0,0]);
% elseif (flag==2)
%     set(gca, 'xtick', [0:600:3000],'fontname', 'arial','fontsize',14,'ticklength',[0,0])
% elseif(flag==3)
%     set(gca, 'xtick', [0:600:3000],'fontname', 'arial','fontsize',14,'ticklength',[0,0])
% elseif (flag==4)
%     set(gca, 'xtick', [0:600:3000],'fontname', 'arial','fontsize',14,'ticklength',[0,0]);
% end;
% grid on

% subplot(3,2,4) 
%  %h1=plot(time,rdhx_energy_fraction);
% % set(h1,'facecolor','g');
%  %hold on
% plot(time,rdhx_energy_fraction, 'b^-','linewidth',2,'markersize',10);
% axis([0 3000 0 100])
% set(gcf,'color', [1 1 1]);
% %set(gca,'yticklabel',[0;25;50;75;100]);
% set(gca, 'fontsize',14);
% title('(d) Transient RDHx Energy Usage Fraction (%)', 'fontname', 'arial', 'fontsize', 16);
% % xlabel('Time (s)', 'fontname', 'arial', 'fontsize', 16);
% % ylabel('RDHx Energy Usage Fraction(%)', 'fontname', 'arial', 'fontsize', 16);
% if (flag==1)
%     set(gca, 'xtick', [0:600:3000],'fontname', 'arial','fontsize',14,'ticklength',[0,0]);
% elseif (flag==2)
%  set(gca, 'xtick', [0:600:3000],'fontname', 'arial','fontsize',14,'ticklength',[0,0]);
% elseif(flag==3)
%     set(gca, 'xtick', [0:600:3000],'fontname', 'arial','fontsize',14,'ticklength',[0,0]);
% elseif (flag==4)
%      set(gca, 'xtick', [0:600:3000],'fontname', 'arial','fontsize',14,'ticklength',[0,0]);
% end;
% grid on

rmsvaluesave.crac=100-RMS(crac_energy_fraction(1:43));
rmsvaluesave.rdhx=100-RMS(rdhx_energy_fraction(1:43));
CRAC_power=140; RDHx_power=18;Meas_window=3000;
%************Energy Consumption of CRAC**********************

CRAC_EC.conser=CRAC_power*(Meas_window/3600);
CRAC_EC_frac=CRAC_power*crac_energy_fraction*0.01;

CRAC_EC.optimal=0;
for i=1:length(time)-2
    CRAC_EC.optimal=CRAC_EC.optimal+0.5*(CRAC_EC_frac(i)+CRAC_EC_frac(i+1))*((time(i+1)-time(i))/3600);
end;

%************Energy Consumption of RDHx**********************

RDHx_EC.conser=RDHx_power*(Meas_window/3600);
RDHx_EC_frac=RDHx_power* rdhx_energy_fraction*0.01;

RDHx_EC.optimal=0;
for i=1:length(time)-2
    RDHx_EC.optimal=RDHx_EC.optimal+0.5*(RDHx_EC_frac(i)+RDHx_EC_frac(i+1))*((time(i+1)-time(i))/3600);
end;

if (flag==1)
    CRAC_Cost=[100;48];
    CRAC_Saving='52%';
    RDHx_Cost=[100;82];
    RDHx_Saving='18%';
elseif (flag==2)
    CRAC_Cost=[100;37];
    CRAC_Saving='63%';
    RDHx_Cost=[100;66];
    RDHx_Saving='34%';
elseif (flag==3)
    CRAC_Cost=[100;34];
    CRAC_Saving='66%';
    RDHx_Cost=[100;81];
    RDHx_Saving='19%';
elseif (flag==4)
    CRAC_Cost=[100;86];
    CRAC_Saving='14%';
    RDHx_Cost=[100;90];
    RDHx_Saving='10%';
end

% x=[1];
% subplot(3,2,5)
% B=bar(x,CRAC_Saving, 'r');
% hold on
% set(B, 'barwidth', 0.5)
% % control=['Peak';'DataCOOL'];
% % set(gca,'xticklabel',control)
% set(gca,'ytick',[0;25;50;75;100],'yticklabel',{'0%','25%','50%','75%','100%'},'fontname', 'arial','fontsize',14);
% ylim([0 110])
% title('Cost Saving in CRAC Operation ($)', 'fontname', 'arial', 'fontsize', 16);
% text(1.5, 85, CRAC_Saving, 'fontsize',16, 'BackgroundColor',[.7 .9 .7]);

% subplot(3,2,6)
% bar(x,RDHx_Saving, 0.5)
% % control=['Peak';'DataCOOL'];
% % set(gca,'xticklabel',control)
% set(gca,'ytick',[0;25;50;75;100],'yticklabel',{'0%','25%','50%','75%','100%'},'fontname', 'arial','fontsize',14);
% ylim([0 110])
% title('Cost Saving in RDHx Operation ($)', 'fontname', 'arial', 'fontsize', 16);
% text(1.5, 85, RDHx_Saving, 'fontsize', 16, 'BackgroundColor',[.7 .9 .7]);

