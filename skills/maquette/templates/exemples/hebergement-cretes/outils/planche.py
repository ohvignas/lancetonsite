import sys; from PIL import Image
fs=sys.argv[2:]; W=800
ims=[Image.open(f).convert("RGB") for f in fs]
ims=[i.resize((W,int(i.height*W/i.width))) for i in ims]
cols=2; rows=(len(ims)+1)//2; H=max(i.height for i in ims)
s=Image.new("RGB",(W*cols,H*rows),"white")
for k,i in enumerate(ims): s.paste(i,((k%cols)*W,(k//cols)*H))
s.save(sys.argv[1],quality=82)
