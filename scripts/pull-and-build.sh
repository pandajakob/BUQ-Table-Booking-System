cd /home/jakob/Desktop/BUQ-Table-Booking-System/ || {
  echo "Error: Directory not found. Exiting.";
  exit 1;
}
now="$(date +'%Y-%m-%d %H:%M:%S')"

# Pull the latest changes
echo "$now Pulling latest changes in $(pwd)..."
sudo git pull

echo "$now building app in $pws..."
sudo npm run build
