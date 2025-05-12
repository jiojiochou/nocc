for i in components hooks; do
  mkdir $i
  cd $i
  pnpm init
  cd ..
done
